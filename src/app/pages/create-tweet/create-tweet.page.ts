import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
@Component({
  selector: 'app-create-tweet',
  templateUrl: './create-tweet.page.html',
  styleUrls: ['./create-tweet.page.scss'],
})
export class CreateTweetPage implements OnInit {
  image: any;
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
        width: 600,
        resultType: CameraResultType.DataUrl
      });
      console.log('image: ', image);
       this.image = image.dataUrl;
      const blob = this.dataURLtoBlob(image.dataUrl);
      const url = await this.uploadImage(blob, image);
      console.log(url);
      // const response = await this.addDocument('test', { imageUrl: url });
      // console.log(response);
    } catch(e) {
      console.log(e);
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

  // addDocument(path: any, data: any) {
  //   const dataRef = collection(this.firestore, path);
  //   return addDoc(dataRef, data);
  // }

  ngOnInit() {
  }

}
