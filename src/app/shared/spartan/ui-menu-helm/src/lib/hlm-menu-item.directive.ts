import { Directive, Input, booleanAttribute, computed, signal } from '@angular/core';
import { VariantProps, cva } from 'class-variance-authority';

import { BrnMenuItemDirective } from '@spartan-ng/ui-menu-brain';
import { ClassValue } from 'clsx';
import { hlm } from '@spartan-ng/ui-core';

export const hlmMenuItemVariants = cva(
	'group w-full relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-base outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground disabled:pointer-events-none disabled:opacity-50',
	{
		variants: { inset: { true: 'pl-10', false: '' } },
		defaultVariants: { inset: false },
	},
);
export type HlmMenuItemVariants = VariantProps<typeof hlmMenuItemVariants>;

@Directive({
	selector: '[hlmMenuItem]',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
	},
	hostDirectives: [
		{
			directive: BrnMenuItemDirective,
			inputs: ['disabled: disabled'],
			outputs: ['triggered: triggered'],
		},
	],
})
export class HlmMenuItemDirective {
	private readonly _inset = signal<boolean>(false);

	private readonly _userCls = signal<ClassValue>('');

	@Input()
	set class(userCls: ClassValue) {
		this._userCls.set(userCls);
	}

	@Input({ transform: booleanAttribute })
	set inset(value: boolean) {
		this._inset.set(value);
	}

	protected _computedClass = computed(() => this._generateClass());

	private _generateClass() {
		return hlm(hlmMenuItemVariants({ inset: this._inset() }), this._userCls());
	}
}
