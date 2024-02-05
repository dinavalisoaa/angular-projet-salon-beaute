import { HttpErrorResponse } from "@angular/common/http";

export const CheckError = (next: (res: any) => any) => {
    return {
      next: next,
      error: (err: HttpErrorResponse) => {

        let errorData: any ={}
        // let errorData: SweetAlertOptions = {icon: "error", title: "Erreur",};
        if (err.status === 0) {
          errorData.text = "Êtes-vous connecté a internet ?";
        }

        else if (500 - err.status <= 0) {
          errorData.text = "Une erreur est survenue"
        }
        else {
          errorData.text = err.error.error;
        }
        alert(errorData.text);
        // Swal.fire(errorData).then();
      }
    }
  };
