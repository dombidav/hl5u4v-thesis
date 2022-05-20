import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SingleLockComponent } from './single-lock.component'

describe('SingleWorkerComponent', () => {
    let component: SingleLockComponent
    let fixture: ComponentFixture<SingleLockComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SingleLockComponent],
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(SingleLockComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
