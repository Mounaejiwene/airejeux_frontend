import { Injectable } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: Toast[] = [];
  private nextId = 0;

  private add(message: string, type: Toast['type'], duration = 4000): void {
    const id = this.nextId++;
    this.toasts.push({ id, message, type });

    setTimeout(() => this.remove(id), duration);
  }

  success(message: string): void {
    this.add(message, 'success');
  }

  error(message: string): void {
    this.add(message, 'error', 6000);
  }

  warning(message: string): void {
    this.add(message, 'warning');
  }

  info(message: string): void {
    this.add(message, 'info');
  }

  remove(id: number): void {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }
}
