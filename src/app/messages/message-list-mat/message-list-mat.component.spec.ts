import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageListMatComponent } from './message-list-mat.component';

describe('MessageListMatComponent', () => {
  let component: MessageListMatComponent;
  let fixture: ComponentFixture<MessageListMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageListMatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageListMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
