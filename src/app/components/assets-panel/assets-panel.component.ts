import {Component, OnInit} from '@angular/core';
import {FeatureCollection} from 'geojson';
import {GeoDataService} from '../../services/geo-data.service';
import {Feature, Project} from '../../models/models';
import {BsModalRef, BsModalService} from 'ngx-foundation';
import {ModalFileBrowserComponent} from '../modal-file-browser/modal-file-browser.component';
import {ProjectsService} from '../../services/projects.service';
import {RemoteFile} from 'ng-tapis';
import { ScrollableArray } from '../../utils/ScrollableArray';
import {PathTree} from '../../models/path-tree';
import {TapisFilesService} from "../../services/tapis-files.service";


@Component({
  selector: 'app-assets-panel',
  templateUrl: './assets-panel.component.html',
  styleUrls: ['./assets-panel.component.styl']
})
export class AssetsPanelComponent implements OnInit {
  features: FeatureCollection;
  activeFeature: Feature;
  scrollableFeatures: ScrollableArray<Feature> = new ScrollableArray([]);
  displayFeatures: Array<Feature>;
  activeProject: Project;
  currentTreeListing: PathTree<Feature>;

  constructor(private geoDataService: GeoDataService, private bsModalService: BsModalService, private projectsService: ProjectsService, private tapisFilesService: TapisFilesService) { }

  ngOnInit() {
    this.scrollableFeatures.currentSelection.subscribe( (next: Array<Feature>) => {
      this.displayFeatures = next;
    });
    this.geoDataService.features.subscribe( (fc: FeatureCollection) => {
      this.features = fc;
      this.scrollableFeatures.setContent(this.features.features);
    });
    this.geoDataService.activeFeature.subscribe( (next) => {
      this.activeFeature = next;
      if (this.activeFeature) { this.scrollToActiveFeature(); }
    });
    this.projectsService.activeProject.subscribe( (current) => {
      this.activeProject = current;
    });
    this.geoDataService.featureTree$.subscribe( (next) => {
      this.currentTreeListing = next;
    });
  }

  scrollToActiveFeature() {
    this.scrollableFeatures.scrollTo(this.activeFeature);
  }

  scrollDown() {
    this.scrollableFeatures.scrollDown();
  }

  scrollUp() {
    this.scrollableFeatures.scrollUp();
  }

  openFileBrowserModal() {
    const initialState = {
      allowedExtensions: this.tapisFilesService.IMPORTABLE_FEATURE_TYPES
    };
    const modal: BsModalRef = this.bsModalService.show(ModalFileBrowserComponent, {initialState});
    modal.content.onClose.subscribe( (files: Array<RemoteFile>) => {
      this.geoDataService.importFileFromTapis(this.activeProject.id, files);
    });
  }

  handleFileInput(files: FileList) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < files.length; i++) {
      this.geoDataService.uploadFile(this.activeProject.id, files[i]);
    }
  }

  exportGeoJSON() {
    this.geoDataService.downloadGeoJSON(this.activeProject.id);
  }

  selectFeature(feat) {
    this.geoDataService.activeFeature = feat;
  }

  selectTreeNode(node: PathTree<Feature>) {
    this.geoDataService.activeFeature = node.getPayload();
  }

}
