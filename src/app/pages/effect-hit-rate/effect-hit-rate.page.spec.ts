import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EffectHitRatePage } from './effect-hit-rate.page';

describe('EffectHitRatePage', () => {
  let component: EffectHitRatePage;
  let fixture: ComponentFixture<EffectHitRatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EffectHitRatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
