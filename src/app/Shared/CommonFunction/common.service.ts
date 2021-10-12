import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }


  
  acceptNumericOnly(value:any,evt): boolean {  
      
    if(value!=null){
      var dec=value.toString();
      var count=dec.split(".");
      
      if(count.length<2){
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode != 46 && charCode > 31
          && (charCode < 48 || charCode > 57))
          return false;
    
        return true;
      }else{
        const charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          return false;
        }
        if (evt.target.value.length == 16) {
          return false;
        }
        return true;
      }
    }else{
      const charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          return false;
        }
        if (evt.target.value.length == 16) {
          return false;
        }
        return true;
    }
  }

  
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    if (event.target.value.length == 16) {
      return false;
    }
    return true;

  }
}
