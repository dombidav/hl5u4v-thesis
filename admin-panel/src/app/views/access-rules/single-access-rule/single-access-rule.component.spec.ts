import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SingleAccessRuleComponent } from './single-access-rule.component'

describe('SingleWorkerComponent', () => {
    let component: SingleAccessRuleComponent
    let fixture: ComponentFixture<SingleAccessRuleComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SingleAccessRuleComponent],
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(SingleAccessRuleComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
