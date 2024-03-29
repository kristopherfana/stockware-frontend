import { Component, Input, computed, signal } from '@angular/core';
import { VariantProps, cva } from 'class-variance-authority';

import { BrnTabsListDirective } from '@spartan-ng/ui-tabs-brain';
import { ClassValue } from 'clsx';
import { hlm } from '@spartan-ng/ui-core';

export const listVariants = cva(
	'inline-flex items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
	{
		variants: {
			orientation: {
				horizontal: 'h-auto space-x-1',
				vertical: 'mt-2 flex-col h-fit space-y-1',
			},
		},
		defaultVariants: {
			orientation: 'horizontal',
		},
	},
);
type ListVariants = VariantProps<typeof listVariants>;

@Component({
	selector: 'hlm-tabs-list',
	standalone: true,
	hostDirectives: [BrnTabsListDirective],
	template: '<ng-content/>',
	host: {
		'[class]': '_computedClass()',
	},
})
export class HlmTabsListComponent {
	private readonly _userCls = signal<ClassValue>('');
	@Input()
	set class(userCls: ClassValue) {
		this._userCls.set(userCls);
	}

	private readonly _orientation = signal<ListVariants['orientation']>('horizontal');
	@Input()
	set orientation(value: ListVariants['orientation']) {
		this._orientation.set(value);
	}

	protected _computedClass = computed(() => this._generateClass());
	private _generateClass() {
		return hlm(listVariants({ orientation: this._orientation() }), this._userCls());
	}
}
