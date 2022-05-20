import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LocksComponent } from './locks.component'

describe('WorkersComponent', () => {
    let component: LocksComponent
    let fixture: ComponentFixture<LocksComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LocksComponent],
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(LocksComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
