import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SingleLockGroupComponent } from './single-lock-group.component'

describe('SingleWorkerComponent', () => {
    let component: SingleLockGroupComponent
    let fixture: ComponentFixture<SingleLockGroupComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SingleLockGroupComponent],
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(SingleLockGroupComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
