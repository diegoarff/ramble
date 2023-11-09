import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import { Firestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GetImageService {
  constructor(
    private firestore: Firestore,
    private storage: Storage
  ) { }

  async takePicture() {
    try {
      if(Capacitor.getPlatform() != 'web') await Camera.requestPermissions();
      const image = await Camera.getPhoto({
        quality: 90,
        // allowEditing: false,
        source: CameraSource.Prompt,
        width: 400,
        height: 400,
        resultType: CameraResultType.DataUrl
      });
      console.log('image: ', image);
      const blob = this.dataURLtoBlob(image.dataUrl);
      console.log('blob: ', blob.size);
      // si la imagen es mayor a 10mb no se sube
      if(blob.size > (1.2 * 1024 * 1024)) {
        console.log('Image is too large');
        return undefined;
      }
      const url = await this.uploadImage(blob, image);
      
      console.log(url);
      return url;
      // const response = await this.addDocument('test', { imageUrl: url });
      // console.log(response);
    } catch(e) {
      console.log(e);
      return undefined;
    }
  }

  dataURLtoBlob(dataurl: any) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
  }

  async uploadImage(blob: any, imageData: any) {
    try {
      const currentDate = Date.now();
      const filePath = `test/${currentDate}.${imageData.format}`;
      const fileRef = ref(this.storage, filePath);
      const task = await uploadBytes(fileRef, blob);
      console.log('task: ', task);
      const url = getDownloadURL(fileRef);
      return url;
    } catch(e) {
      throw(e);
    }    
  }
}


