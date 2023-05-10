import { Component, Input, Output, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-thoughts',
  templateUrl: './thoughts.component.html',
  styleUrls: ['./thoughts.component.css']
})
export class ThoughtsComponent {
  @Output() onThought = new Subject<string>()
  @Input() canShare = false
  thoughtForm!: FormGroup

  fb: FormBuilder = inject(FormBuilder)


ngOnInit(): void {
    this.thoughtForm = this.fb.group({
      thought: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      
    })

}


  clearForm() {
  this.thoughtForm.reset();
  }

  onSubmit() {
    const thought = this.thoughtForm.value['thought']
    this.onThought.next(thought)
  }

  invalid():boolean {
    return this.canShare || this.thoughtForm.invalid
  }
}


