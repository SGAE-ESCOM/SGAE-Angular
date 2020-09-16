import { FormGroup } from '@angular/forms';

export function nombreValidator(g: FormGroup) {
    return g.get('nombres').value === g.get('passwordRepeat').value
        ? null :  g.get('passwordRepeat').setErrors({ mustMatch: true });
}