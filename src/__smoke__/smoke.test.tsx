import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { cn } from '@/utils/cn';
import { test, expect } from 'vitest';

test('alias + jsdom + jest-dom matcher', () => {
	expect(cn('a', 'b')).toBeTruthy();
	render(<div data-testid="x">hi</div>);
	expect(screen.getByTestId('x')).toBeInTheDocument();
});
