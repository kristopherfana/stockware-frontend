import { Component, Input, computed, signal } from '@angular/core';

import { ClassValue } from 'clsx';
import { hlm } from '@spartan-ng/ui-core';

@Component({
	selector: 'hlm-dialog-footer',
	standalone: true,
	template: `
		<ng-content />
	`,
	host: {
		'[class]': '_computedClass()',
	},
})
export class HlmDialogFooterComponent {
	private readonly _userCls = signal<ClassValue>('');
	@Input()
	set class(userCls: ClassValue) {
		this._userCls.set(userCls);
	}

	protected _computedClass = computed(() => this._generateClass());
	private _generateClass() {
		return hlm('flex flex-col sm:space-x-2 w-full', this._userCls());
	}
}
