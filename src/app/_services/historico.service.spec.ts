// Import necessary modules and services
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { historicoService } from "./historico.service";
import { historicoModel } from "../_models/historico.model";

describe("historicoService", () => {
  let service: historicoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [historicoService],
    });

    service = TestBed.inject(historicoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should fetch historico data", () => {
    const mockHistorico: historicoModel[] = [];

    // Subscribe to our service method
    service.getHistorico().subscribe((data) => {
      // Expect the data returned by the service to equal our mock data
      expect(data).toEqual(mockHistorico);
    });

    // Expect a single request to have been made to the specified URL
    const req = httpMock.expectOne("http://localhost:3000/historico");
    // Expect the request method to be GET
    expect(req.request.method).toBe("GET");
    // Return our mock data as the response of the request
    req.flush(mockHistorico);
  });
});
