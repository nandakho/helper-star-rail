import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DmgCalcPage } from './dmg-calc.page';

describe('DmgCalcPage', () => {
  let component: DmgCalcPage;
  let fixture: ComponentFixture<DmgCalcPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DmgCalcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
