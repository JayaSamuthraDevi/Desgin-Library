import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ModalComponent } from './modal';

// Host component to test <ng-content> projection
@Component({
  standalone: true,
  imports: [ModalComponent],
  template: `
    <app-modal
      [isOpen]="true"
      [title]="'Test Modal'"
      [cancelLabel]="'Dismiss'"
      [confirmLabel]="'Okay'"
      (close)="onClose()"
      (cancel)="onCancel()"
      (confirm)="onConfirm()"
      (cancelDisabled)="isFormInvalid()" 
      (confirmDisabled)="isFormInvalid()">
      <div>  
      <p>Projected body content</p>
        <form>
          <label>Name</label>
          <input type="text" class="cds--text-input" />
          <label>Email</label>
          <input type="email" class="cds--text-input" />
        </form>
      <p>Projected body content</p>
      <div footer>
        <button class="custom-footer-btn">Custom Footer</button>
      </div>
    </app-modal>
  `
})
class HostComponent {
  onClose = jasmine.createSpy('onClose');
  onCancel = jasmine.createSpy('onCancel');
  onConfirm = jasmine.createSpy('onConfirm');
}

describe('ModalComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the modal title', () => {
    const title = fixture.debugElement.query(By.css('.cds--modal-header__heading')).nativeElement;
    expect(title.textContent).toContain('Test Modal');
  });

  it('should project body content', () => {
    const body = fixture.debugElement.query(By.css('.cds--modal-content')).nativeElement;
    expect(body.textContent).toContain('Projected body content');
  });

  it('should render custom footer content', () => {
    const footerBtn = fixture.debugElement.query(By.css('.custom-footer-btn'));
    expect(footerBtn).toBeTruthy();
  });

  it('should emit close event when close button is clicked', () => {
    const closeBtn = fixture.debugElement.query(By.css('.cds--modal-close'));
    closeBtn.nativeElement.click();
    expect(host.onClose).toHaveBeenCalled();
  });

  it('should emit cancel and confirm events when footer buttons are clicked', () => {
    const cancelBtn = fixture.debugElement.query(By.css('.cds--btn.cds--btn--secondary'));
    const confirmBtn = fixture.debugElement.query(By.css('.cds--btn.cds--btn--primary'));

    cancelBtn.nativeElement.click();
    confirmBtn.nativeElement.click();

    expect(host.onCancel).toHaveBeenCalled();
    expect(host.onConfirm).toHaveBeenCalled();
  });

  it('should disable cancel and confirm buttons if inputs are true', () => {
    const modal = fixture.debugElement.query(By.directive(ModalComponent)).componentInstance as ModalComponent;

    modal.cancelDisabled.bind(true);
    modal.confirmDisabled.bind(true);
    fixture.detectChanges();

    const cancelBtn = fixture.debugElement.query(By.css('.cds--btn.cds--btn--secondary')).nativeElement;
    const confirmBtn = fixture.debugElement.query(By.css('.cds--btn.cds--btn--primary')).nativeElement;

    expect(cancelBtn.disabled).toBeTrue();
    expect(confirmBtn.disabled).toBeTrue();
  });

  it('should hide footer when showFooter is false', () => {
    const modal = fixture.debugElement.query(By.directive(ModalComponent)).componentInstance as ModalComponent;

    modal.showDefaultFooter.bind(false);
    fixture.detectChanges();

    const footer = fixture.debugElement.query(By.css('.cds--modal-footer'));
    expect(footer).toBeNull();
  });
});
