export class ImageUploader {

  dialog: any;

  reader: FileReader;
  image: HTMLImageElement;
  canvas: any;

  maxHeight = 320;
  maxWidth = 640;

  rotation = 0;
  crop = [0, 0, 1, 1];

  constructor(dialog: any) {

    this.dialog = dialog;

    this.dialog.addEventListener('imageuploader.fileready', (event: any) => this.loadFile(event.detail().file));

    this.dialog.addEventListener('imageuploader.clear', (event: any) => this.dialog.clear());

    this.dialog.addEventListener('imageuploader.cancelupload', (event: any) => this.dialog.state('empty'));

    this.dialog.addEventListener('imageuploader.save', (event: any) => this.save());

    this.dialog.addEventListener('imageuploader.rotatecw', (event: any) => this.rotateImage(0.5 * Math.PI));

    this.dialog.addEventListener('imageuploader.rotateccw', (event: any) => this.rotateImage(-0.5 * Math.PI));

    this.dialog.addEventListener('imageuploader.mount', (event: any) => this.createCanvas());

    //	Create our FileReader and run the results through the render function.
    this.reader = new FileReader();

    this.reader.onprogress = (data: any) => {
      if (data.lengthComputable) {
        this.dialog.progress((data.loaded / data.total) * 100);
      }
    };

    this.reader.onload = (e: any) => {
      this.createImage(e.target.result);
    };

  }

  loadFile(file: Blob) {

    this.dialog.progress(0);
    this.dialog.state('uploading');

    this.reader.readAsDataURL(file);

  }

  createCanvas() {
    let canvas = this.canvas = this.dialog._domView.appendChild(document.createElement('canvas'));
    let ctx = canvas.getContext('2d');

    canvas.width = this.maxWidth;
    canvas.height = this.maxHeight;

    ctx.translate(canvas.width / 2, canvas.height / 2);

  }

  createImage(data: string) {
    let image = this.image = new Image();
    let canvas = this.canvas;

    image.onload = () => {
      this.renderImage();
      this.dialog.state('populated');
    };

    console.log(canvas.getContext('2d'), { image: image });

    image.src = data;
  }

  renderImage() {

    let canvas = this.canvas;
    let ctx = canvas.getContext('2d');
    let image = this.image;

    let crop = this.crop;

    console.log(crop);

    // tslint:disable-next-line:one-variable-per-declaration
    let w, h, r, rotatedWidth, rotatedHeight;

    w = image.width * (crop[2] - crop[0]);
    h = image.height * (crop[3] - crop[1]);
    r = Math.sqrt(Math.pow(w / 2, 2) + Math.pow(h / 2, 2));

    rotatedWidth = Math.abs(r * Math.cos(this.rotation + Math.acos(w / 2 / r))) * 2;

    if (rotatedWidth > this.maxWidth) {
      w *= this.maxWidth / rotatedWidth;
      h *= this.maxWidth / rotatedWidth;
    }

    r = Math.sqrt(Math.pow(w / 2, 2) + Math.pow(h / 2, 2));

    rotatedHeight = Math.abs(r * Math.sin(this.rotation + Math.asin(h / 2 / r))) * 2;

    if (rotatedHeight > this.maxHeight) {
      w *= this.maxHeight / rotatedHeight;
      h *= this.maxHeight / rotatedHeight;
    }

    r = Math.sqrt(Math.pow(w / 2, 2) + Math.pow(h / 2, 2));

    rotatedWidth = Math.abs(r * Math.cos(this.rotation + Math.acos(w / 2 / r))) * 2;
    rotatedHeight = Math.abs(r * Math.sin(this.rotation + Math.asin(h / 2 / r))) * 2;

    canvas.width = rotatedWidth;
    canvas.height = rotatedHeight;

    this.dialog.populate(null, [rotatedWidth, rotatedHeight]);

    ctx.save();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.translate(canvas.width / 2, canvas.height / 2);

    ctx.rotate(this.rotation);

    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    ctx.drawImage(image, image.width * crop[0], image.height * crop[1], image.width * (crop[2] - crop[0]), image.height * (crop[3] - crop[1]), 0, 0, canvas.width, canvas.height);

    ctx.restore();
  }

  rotateImage(radians: number) {

    this.rotation += radians;

    this.renderImage();

  }

  cropImage() {
    let crop = this.dialog.cropRegion();
    let canvas = this.canvas;
    let ctx = canvas.getContext('2d');
    let image = this.image;

    image.width *= (crop[2] - crop[0]);
    image.height *= (crop[3] - crop[1]);

    ctx.save();

    ctx.translate(canvas.width / 2, canvas.height / 2);

    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    ctx.drawImage(image, image.width * crop[0], image.height * crop[1], image.width * (crop[2] - crop[0]), image.width * (crop[3] - crop[1]), -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    ctx.restore();
  }

  save() {

    this.crop = this.dialog.cropRegion();

    this.renderImage();

    this.dialog.save(this.canvas.toDataURL('image/jpeg'), [this.canvas.width, this.canvas.height], {});
  }

}
