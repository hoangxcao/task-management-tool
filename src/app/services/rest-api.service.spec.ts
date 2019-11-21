import { TestBed } from '@angular/core/testing';

import { RestApiService } from './rest-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

describe('RestApiService', () => {
  let httpTestingController: HttpTestingController;
  let service: RestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestApiService],
      imports: [HttpClientTestingModule]
    })

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(RestApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getTasks', () => {
    it('returned Observable should match the right data', () => {
      const mockCourses = [
        {
          QuoteNumber: 111,
          QuoteType: 'MOC1',
          Contact: 'Mock Contact 1',
          TaskDescription: 'None',
          TaskType: 'Follow-up',
          DueDate: new Date('2020-01-01'),
          Quote: 'None',
          Status: 'Open',
        },
        {
          QuoteNumber: 222,
          QuoteType: 'MOC2',
          Contact: 'Mock Contact 2',
          TaskDescription: 'None',
          TaskType: 'Follow-up',
          DueDate: new Date('2020-01-01'),
          Quote: 'None',
          Status: 'Open',
        }
      ];

      service.getTasks()
        .subscribe(tasksData => {
          expect(tasksData[0].QuoteNumber).toEqual(111);
          expect(tasksData[0].QuoteType).toEqual('MOC1');

          expect(tasksData[1].QuoteNumber).toEqual(222);
          expect(tasksData[1].QuoteType).toEqual('MOC2');
        });

      const req = httpTestingController.expectOne('http://localhost:44312/api/Tasks');

      expect(req.request.method).toEqual('GET');

      req.flush(mockCourses);
    });
  });

  describe('#getTask', () => {
    it('returned Observable should match the right data', () => {
      const mockTask = {
        QuoteNumber: 111,
        QuoteType: 'MOC',
        Contact: 'Mock Contact',
        TaskDescription: 'None',
        TaskType: 'Follow-up',
        DueDate: new Date('2020-01-01'),
        Quote: 'None',
        Status: 'Open',
      };

      service.getTask(111)
        .subscribe(taskData => {
          expect(taskData.QuoteType).toEqual('MOC');
        });

      const req = httpTestingController.expectOne('http://localhost:44312/api/Tasks/111');

      expect(req.request.method).toEqual('GET');

      req.flush(mockTask);
    });
  });

  describe('#createTask', () => {
    it('returned Observable should match the right data', () => {
      const mockTask = {
        QuoteNumber: 111,
        QuoteType: 'MOC',
        Contact: 'Mock Contact',
        TaskDescription: 'None',
        TaskType: 'Follow-up',
        DueDate: new Date('2020-01-01'),
        Quote: 'None',
        Status: 'Open',
      };

      service.createTask(mockTask)
        .subscribe(taskData => {
          expect(taskData.QuoteType).toEqual('MOC');
        });

      const req = httpTestingController.expectOne('http://localhost:44312/api/Tasks');

      expect(req.request.method).toEqual('POST');

      req.flush(mockTask);
    });
  });
});
