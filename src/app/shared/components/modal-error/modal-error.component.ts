import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  input,
  model,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-modal-error',
  imports: [],
  templateUrl: './modal-error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalErrorComponent {
  isModalOpen = input.required<boolean>();

  closeModal = output<boolean>();

  cerrarModal() {
    this.closeModal.emit(false);
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.isModalOpen()) this.cerrarModal();
  }
}
