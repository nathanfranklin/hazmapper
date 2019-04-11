import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from "./app.component";
import { MapComponent} from "./components/map/map.component";
import { DockComponent } from "./components/dock/dock.component";
import { MainComponent } from "./components/main/main.component";
import { AssetsPanelComponent } from "./components/assets-panel/assets-panel.component";
import { JwtInterceptor } from "./app.interceptors";
import { NotFoundComponent } from './components/notfound/notfound.component';
import { ControlBarComponent } from './components/control-bar/control-bar.component';
import { DirectivesModule } from "./directives/directives.module";
import { LayersPanelComponent } from './components/layers-panel/layers-panel.component';
import { SettingsPanelComponent } from './components/settings-panel/settings-panel.component';
import { FiltersPanelComponent } from './components/filters-panel/filters-panel.component';
import { MeasurePanelComponent } from './components/measure-panel/measure-panel.component';
import { AssetDetailComponent } from './components/asset-detail/asset-detail.component';
import { FeatureIconComponent } from './components/feature-icon/feature-icon.component';
import { FeatureRowComponent } from './components/feature-row/feature-row.component';


@NgModule({
  declarations: [
    AppComponent, MapComponent, NotFoundComponent, MainComponent, DockComponent,
    AssetsPanelComponent,
    ControlBarComponent,
    LayersPanelComponent,
    SettingsPanelComponent,
    FiltersPanelComponent,
    MeasurePanelComponent,
    AssetDetailComponent,
    FeatureIconComponent,
    FeatureRowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DirectivesModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }

