import 'zone.js/node';
import {
  provideServerRendering,
  renderApplication,
  ɵSERVER_CONTEXT as SERVER_CONTEXT,
} from '@angular/platform-server';
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { mainProviders } from './main.providers';

if (import.meta.env.PROD) {
  enableProdMode();
}

export function bootstrap() {
  return bootstrapApplication(AppComponent, {
    providers: [
      mainProviders,
      provideServerRendering(),
      { provide: SERVER_CONTEXT, useValue: 'ssr-analog' },
    ],
  });
}

export default async function render(url: string, document: string) {
  const html = await renderApplication(bootstrap, {
    document,
    url,
  });

  return html;
}
