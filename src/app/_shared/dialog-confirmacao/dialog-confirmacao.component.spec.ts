import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmacaoComponent } from './dialog-confirmacao.component';

describe('DialogConfirmacaoComponent', () => {
  let component: DialogConfirmacaoComponent;
  let fixture: ComponentFixture<DialogConfirmacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConfirmacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogConfirmacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
