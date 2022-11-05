/// <reference types="forge-viewer" />
import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Extension, ViewerInitializedEvent } from 'ng2-adsk-forge-viewer';
import { CustomExtension } from './extension';
import { ForgeService } from './forge.service';

@Component({
  selector: 'lib-forge',
  templateUrl: './forge.component.html',
  styleUrls: ['./forge.component.scss']
})
export class ForgeComponent implements AfterViewInit {
  viewerOptions: any;
  enable = false;

  ngAfterViewInit() {
    this.enable = true;
    this.viewerOptions = {
      initializerOptions: {
        env: 'Local',
        document: 'http://localhost:4200/assets/output/Resource/3D View/08f99ae5-b8be-4f8d-881b-128675723c10/New Construction/New Construction.svf'
      },
      viewerConfig: {
        forgeService : this.forgeService,
        extensions: [
          'Autodesk.DocumentBrowser',
          'Autodesk.AEC.LevelsExtension',
          CustomExtension.extensionName
        ],
        theme: "bim-theme"
      },
      onViewerScriptsLoaded: () => this.registerExtensions(),
      onViewerInitialized: (args: ViewerInitializedEvent) => {
        // custom loads
      },
    };
  }

  private registerExtensions() {
    const extensions = [
      { extensionName: CustomExtension.extensionName, extensionType: CustomExtension }
    ];

    extensions.forEach(ext => Extension.registerExtension(ext.extensionName, ext.extensionType));
  }

  constructor(public forgeService: ForgeService) {}

}
