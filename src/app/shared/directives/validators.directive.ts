import { Directive, HostListener, ElementRef } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from "@angular/forms";

@Directive({
    selector: '[just-number][formControlName],[just-number][formControl],[just-number][ngModel],input[just-number]',
    providers: [{ provide: NG_VALIDATORS, useExisting: JustNumberValidator, multi: true }]
})
export class JustNumberValidator implements Validator {
    validate(control: AbstractControl): ValidationErrors {
        return null;
    }
    registerOnValidatorChange?(fn: () => void): void {

    }
    @HostListener('keydown')
    onKeyDown() {
        var evt: any = window.event;
        var element = evt.target;

        var key = (evt.keyCode) ? evt.keyCode : evt.which;
        if (!this.checkFirstCharacter(element.value, key)) {
            return false;
        }
        if (!this.checkLimitedCharacters(element.value, key)) {
            return false;
        }
        if (key != null) {
            key = parseInt(key, 10);
            if ((key < 48 || key > 57) && (key < 96 || key > 105)) {
                if (!this.jsIsUserFriendlyChar(key, "Decimals")) {
                    return false;
                }
            }
            else {
                if (evt.shiftKey) {
                    return false;
                }
            }
        }
        return true;
    }

    jsIsUserFriendlyChar(val, step) {
        // Backspace, Tab, Enter, Insert, and Delete  
        if (val == 8 || val == 9 || val == 13 || val == 45 || val == 46) {
            return true;
        }
        // Ctrl, Alt, CapsLock, Home, End, and Arrows  
        if ((val > 16 && val < 21) || (val > 34 && val < 41)) {
            return true;
        }
        // "-" character
        if ([109, 189].indexOf(val) > -1) {
            return true;
        }
        if (step == "Decimals") {
            if (val == 190 || val == 110) {  //Check dot key code should be allowed
                return true;
            }
        }
        // The rest  
        return false;
    }

    checkLimitedCharacters(val, key) {
        // "." and "-" characters are allowed just one time.
        if ([109, 189].indexOf(key) > -1 && val.indexOf('-') > -1) {
            return false;
        }
        else if ([110, 190].indexOf(key) > -1 && val.indexOf('.') > -1) {
            return false;
        }
        else {
            return true;
        }
    }

    checkFirstCharacter(val, key) {
        //check if "-" character is the first character
        if ([109, 189].indexOf(key) > -1 && val.trim() != '') {
            return false;
        }
        else {
            return true;
        }
    }
}

@Directive({
    selector: '[is-name][formControlName], [is-name][formControl], [is-name][ngModel]',
    providers: [{ provide: NG_VALIDATORS, useExisting: IsNameValidator, multi: true }]
})
export class IsNameValidator implements Validator {
    persianCharacters = ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج', 'چ', 'پ',
        'ش', 'س', 'ی', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ک', 'گ', 'ظ', 'ط', 'ز', 'ر', 'ذ', 'د', 'د', 'ئ', 'و'];
    englishCharacters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd',
        'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
    validate(control: AbstractControl): ValidationErrors {
        return null;
    }
    registerOnValidatorChange?(fn: () => void): void {

    }
    @HostListener('keydown')
    onKeyDown() {
        let evt: any = window.event;
        let element = evt.target;
        var key = (evt.keyCode) ? evt.keyCode : evt.which;

        if (evt.shiftKey) {
            return true;
        }
        // Backspace, Tab, Enter, space, Insert, and Delete  
        if (key == 8 || key == 9 || key == 13 || key == 32 || key == 45 || key == 46) {
            return true;
        }
        // Ctrl, Alt, CapsLock, Home, End, and Arrows  
        if ((key > 16 && key < 21) || (key > 34 && key < 41)) {
            return true;
        }
        if (['', 'fa'].indexOf(element.attributes['is-name'].value.trim()) > -1 &&
            this.persianCharacters.indexOf(evt.key) > -1) {
            return true;
        }
        if (['', 'en'].indexOf(element.attributes['is-name'].value.trim()) > -1 &&
            this.englishCharacters.indexOf(evt.key) > -1) {
            return true;
        }
        return false;
    }
}

@Directive({
    selector: '[is-mobile][formControlName],[is-mobile][formControl],[is-mobile][ngModel]',
    providers: [{ provide: NG_VALIDATORS, useExisting: IsMobileValidator, multi: true }]
})
export class IsMobileValidator implements Validator {
    validate(control: AbstractControl): ValidationErrors {
        return control.value.toString().length >= 11 ? null : { 'mobileError': true };
    }
    registerOnValidatorChange?(fn: () => void): void {

    }
}

@Directive({
    selector: '[max-length][formControlName],[max-length][formControl],[max-length][ngModel]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MaxLengthValidator, multi: true }]
})
export class MaxLengthValidator implements Validator {
    validate(control: AbstractControl): ValidationErrors {
        return null;
    }
    registerOnValidatorChange?(fn: () => void): void {

    }
    @HostListener('keydown')
    onKeyDown() {
        let evt: any = window.event;
        let element = evt.target;
        var key = (evt.keyCode) ? evt.keyCode : evt.which;

        // Backspace, Tab, Enter, space, Insert, and Delete  
        if (key == 8 || key == 9 || key == 13 || key == 32 || key == 45 || key == 46) {
            return true;
        }
        // Ctrl, Alt, CapsLock, Home, End, and Arrows  
        if ((key > 16 && key < 21) || (key > 34 && key < 41)) {
            return true;
        }
        let maxLength = element.attributes['max-length'].value;
        if (isNaN(maxLength)) {
            console.warn('max-length attribute must have number value!');
            return false;
        }

        if (element.value.length >= Number(maxLength)) {
            return false;
        }
        else {
            return true;
        }
    }
}

@Directive({
    selector: '[is-nationalcode][formControlName],[is-nationalcode][formControl],[is-nationalcode][ngModel]',
    providers: [{ provide: NG_VALIDATORS, useExisting: IsNationalcode, multi: true }]
})
export class IsNationalcode implements Validator {
    validate(control: AbstractControl): ValidationErrors {
        let checkResult = this.checkNationalCode(control.value);

        return checkResult ? null : { 'invalid national code!': true };
    }
    registerOnValidatorChange?(fn: () => void): void { }
    checkNationalCode(code) {
        if (!code || code == '') {
            return false;
        }

        var l = code.length;
        if (!/^\d{10}$/.test(code) ||
            code == '0000000000' ||
            code == '1111111111' ||
            code == '2222222222' ||
            code == '3333333333' ||
            code == '4444444444' ||
            code == '5555555555' ||
            code == '6666666666' ||
            code == '7777777777' ||
            code == '8888888888' ||
            code == '9999999999') {
            return false;
        }
        if (l < 8 || parseInt(code, 10) == 0) {
            return false;
        }
        code = ('0000' + code).substr(l + 4 - 10);
        if (parseInt(code.substr(3, 6), 10) == 0) {
            return false;
        }
        var c = parseInt(code.substr(9, 1), 10);
        var s = 0;
        for (var i = 0; i < 9; i++) {
            s += parseInt(code.substr(i, 1), 10) * (10 - i);
        }
        s = s % 11;
        return (s < 2 && c == s) || (s >= 2 && c == (11 - s));
    };
}

@Directive({
    selector: '[max][formControlName],[max][formControl],[max][ngModel]',
})
export class MaxValueDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors {
        return null;
    }
    registerOnValidatorChange?(fn: () => void): void {

    }

    @HostListener('keyup')
    onKeyUp() {
        let evt: any = window.event;
        this.checkMaxLength(evt);
    }
    @HostListener('paste')
    onPaste() {
        let evt: any = window.event;
        window.setTimeout(() => { this.checkMaxLength(evt) }, 200);
    }
    checkMaxLength(evt) {
        let element = evt.target;
        let maxValue = Number(element.attributes['max'].value);
        let elementValue = Number(element.value);

        if (!isNaN(maxValue) && maxValue < elementValue) {
            element.value = maxValue;
        }
    }
}

@Directive({
    selector: '[min][formControlName],[min][formControl],[min][ngModel]',
})
export class MinValueDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors {
        return null;
    }
    registerOnValidatorChange?(fn: () => void): void {

    }

    @HostListener('keyup')
    onKeyUp() {
        let evt: any = window.event;
        this.checkMinLength(evt);
    }
    @HostListener('paste')
    onPaste() {
        let evt: any = window.event;
        window.setTimeout(() => { this.checkMinLength(evt) }, 200);
    }
    checkMinLength(evt) {
        let element = evt.target;
        let minValue = Number(element.attributes['min'].value);
        let elementValue = Number(element.value);

        if (!isNaN(minValue) && minValue > elementValue) {
            element.value = minValue;
        }
    }
}

@Directive({
    selector: '[just-number][maxlength]'
})
export class DecorateNumberBox {
    constructor(private element: ElementRef) { }

    @HostListener('blur')
    onBlur() {        
        var maxLength = this.element.nativeElement.attributes['maxlength'].value;
        
        while (Number(maxLength) > this.element.nativeElement.value.length) {
            this.element.nativeElement.value = `0${ this.element.nativeElement.value}`;
        }
    }
}