import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { NewDriverComponent } from '../components/new-driver/new-driver.component';

describe('NewDriverComponent', () => {
  let component: NewDriverComponent;
  let fixture: ComponentFixture<NewDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDriverComponent ],
      imports: [ HttpClientTestingModule, MatDialogModule, ReactiveFormsModule, FormsModule, MatSnackBarModule ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
