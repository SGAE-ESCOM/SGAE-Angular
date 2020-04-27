import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAdmonComponent } from './editar-admon.component';

describe('EditarAdmonComponent', () => {
  let component: EditarAdmonComponent;
  let fixture: ComponentFixture<EditarAdmonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarAdmonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarAdmonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
