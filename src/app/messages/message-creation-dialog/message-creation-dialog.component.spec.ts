import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageCreationDialogComponent } from './message-creation-dialog.component';

describe('MessageCreationDialogComponent', () => {
  let component: MessageCreationDialogComponent;
  let fixture: ComponentFixture<MessageCreationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageCreationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
