import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserAPI } from './userAPI.service';
import { FormGroup, ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';
import { Response } from './register/models/RegisterUser';

describe('UserAPI Service', () => {
  let service: UserAPI;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [UserAPI, FormBuilder]
    });
    service = TestBed.inject(UserAPI);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new user', () => {
    const form = new FormGroup({
      forenames: new FormControl('John'),
      surname: new FormControl('Doe'),
      emailAddress: new FormControl('john@example.com'),
      telephone: new FormControl('1234567890'),
      dateOfBirth: new FormControl('1990-01-01'),
      password: new FormControl('password123')
    });

    const response: Response = {
      success: true,
      response: {
        userId: 1,
        forenames: null,
        surname: null,
        emailAddress: 'john@example.com',
        telephone: null,
        dateOfBirth: null
      },
      message: null,
      timestamp: new Date()
    };

    service.createUser(form).subscribe((res: Response) => {
      expect(res).toEqual(response);
    })

    const req = httpMock.expectOne('http://localhost:4200/api/user/create');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(form.value);
    req.flush(response);
  })

  it('should retrieve user by ID', () => {
    const userId = 1;
    const expectedUser = {
      userId: userId,
      forenames: "will",
      surname: "pennell",
      emailAddress: "will123@me.com",
      telephone: "12309913",
      dateOfBirth: "1994-11-20"
    };
  
    service.getUser(userId).subscribe((user) => {
      expect(user.success).toBeTrue();
      expect(user.response).toEqual(expectedUser);
    });
    
    const req = httpMock.expectOne(`http://localhost:4200/api/user/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush({success: true, response: expectedUser});
  });

  it('should update user', () => {
    const form = new FormGroup({
      forenames: new FormControl('John'),
      surname: new FormControl('Doe'),
      emailAddress: new FormControl('john@example.com'),
      telephone: new FormControl('1234567890'),
      dateOfBirth: new FormControl('1990-01-01'),
      password: new FormControl('password123')
    });
  
    const userId = 1;
    const updatedUser = {
      userId: userId,
      forenames: 'Updated Forenames',
      surname: 'Updated Surname',
      emailAddress: 'updated@example.com',
      telephone: '123456789',
      dateOfBirth: '1990-01-01'
    };
  
    service.updateUser(form, userId).subscribe((response) => {
      expect(response.success).toBeTrue();
      expect(response.response).toEqual(updatedUser);
    });
  
    const req = httpMock.expectOne(`http://localhost:4200/api/user/${userId}`);
    expect(req.request.method).toBe('PUT');
    req.flush({ success: true, response: updatedUser });
  });

  it('should delete user', () => {
    const userId = 1;
  
    service.deleteUser(userId).subscribe((response) => {
      expect(response.success).toBeTrue();
      expect(response.message).toEqual('User deleted successfully');
    });
  
    const req = httpMock.expectOne(`http://localhost:4200/api/user/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ success: true, message: 'User deleted successfully' });
  });


});
