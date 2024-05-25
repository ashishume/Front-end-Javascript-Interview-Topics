import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualScrollComponent } from './virtual-scroll.component';

describe('VirtualScrollComponent', () => {
  let component: VirtualScrollComponent;
  let fixture: ComponentFixture<VirtualScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualScrollComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VirtualScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
