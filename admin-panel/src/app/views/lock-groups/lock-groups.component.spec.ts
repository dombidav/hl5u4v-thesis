import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LockGroupsComponent } from './lock-groups.component'

describe('WorkersComponent', () => {
    let component: LockGroupsComponent
    let fixture: ComponentFixture<LockGroupsComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LockGroupsComponent],
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(LockGroupsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
