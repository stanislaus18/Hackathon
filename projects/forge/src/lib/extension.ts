import { Extension } from 'ng2-adsk-forge-viewer';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { ForgeService } from './forge.service';

export class CustomExtension extends Extension {
    dbIds = [5630, 5629, 5626, 5614, 5625, 5624, 5678, 5623, 5596, 5595, 5602, 5603];

    listOfRooms = [
        { name: 'AC_Room_1', color: [124, 252, 0], dbid: 5630 },
        { name: 'AC_Room_2', color: [124, 252, 0], dbid: 5629 },
        { name: 'AC_Room_3', color: [124, 252, 0], dbid: 5626 },
        { name: 'TV_Room_1', color: [255, 0, 0], dbid: 5614 },
        { name: 'TV_Room_2', color: [255, 0, 0], dbid: 5625 },
        { name: 'TV_Room_3', color: [255, 0, 0], dbid: 5624 },
        { name: 'Fridge_Room_1', color: [255, 255, 0], dbid: 5678 },
        { name: 'Fride_Room_2', color: [255, 255, 0], dbid: 5623 },
        { name: 'Fridge_Room_3', color: [255, 255, 0], dbid: 5596 },
        { name: 'Light_Room_1', color: [30, 144, 255], dbid: 5595 },
        { name: 'Light_Room_2', color: [30, 144, 255], dbid: 5602 },
        { name: 'Light_Room_3', color: [30, 144, 255], dbid: 5603 }
    ];

    public static override extensionName = 'CustomExtension';
    levelSelectorExtension: Autodesk.Viewing.Extension | undefined;

    selectionProxies: any[] = [];
    private unsubscribe$ = new Subject<boolean>();
    instanceTree: Autodesk.Viewing.InstanceTree | any;
    forgeService: ForgeService | any;

    activate(): boolean {
        return true;
    }

    deactivate(): boolean {
        return true;
    }

    async load(): Promise<boolean> {
        fromEvent(this.viewer, Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => this.onObjectTreeCreated());
        return true;
    }

    unload() {
        this.unsubscribe$.next(true);
        return true;
    }

    async onObjectTreeCreated() {
        setTimeout(async () => {
            await new Promise<void>(resolve => {
                this.viewer.getExtension('Autodesk.AEC.LevelsExtension', ext => {
                    this.levelSelectorExtension = ext;
                    this.getRooms();
                    this.forgeService = this.extOptions['forgeService'];
                    this.changeRoomColors();
                    resolve();
                });
            });
        }, 1000)
    }

    private changeRoomColors() {

        this.forgeService.getMessage('AC').subscribe((data: any) => {
            this.changeColor(data);
        });
        this.forgeService.getMessage('TV').subscribe((data: any) => {
            this.changeColor(data);
        });
        this.forgeService.getMessage('FRIDGE').subscribe((data: any) => {
            this.changeColor(data);
        });
        this.forgeService.getMessage('LIGHTS').subscribe((data: any) => {
            this.changeColor(data);
        });
    }

    private changeColor(data: any){
        const uuid = this.selectionProxies.find(e => e.name === data.name)?.uuid;
        if (data.value) {
            this.spaceColorChange([this.listOfRooms.find(e => e.name === data.name)] as any);
        } else {
            this.uncolor(uuid);
            const index = this.selectionProxies.indexOf((e: any) => e.name === data.name);
            if (index > -1) { // only splice array when item is found
                this.selectionProxies.splice(index, 1); // 2nd parameter means remove one item only
              }
        }
        this.viewer.impl.invalidate(true);
    }

    getRooms() {
        this.instanceTree = this.viewer.model.getInstanceTree();
        // const allDbIds = Object.keys(this.instanceTree.nodeAccess.dbIdToIndex).map(id => +id);


        this.hideRooms();

       // this.spaceColorChange(this.listOfRooms);

        this.dbIds.forEach(d => this.viewer.model.visibilityManager.setNodeOff(d, false));
    }

    hideRooms() {
        const matfrag = this.getMaterialAndFragList();
        this.dbIds.forEach(r => this.hideRoomMaterial(matfrag.fragList, matfrag.material, r));

        this.viewer.impl.invalidate(true);
        if (this.selectionProxies.length) {
            this.selectionProxies.forEach(selectionProxy => this.viewer.impl.sceneAfter.remove(selectionProxy));
        }
    }

    private hideRoomMaterial(fragList: any, material: any, dbId: any) {
        this.instanceTree.enumNodeFragments(dbId, (frag: any) => {
            // this part hides the rooms
            fragList.setMaterial(frag, material);
            const fragProxy = (this.viewer.impl as any).getFragmentProxy(this.viewer.model, frag);
            fragProxy.updateAnimTransform();
        });
    }

    private getMaterialAndFragList() {
        const material: any = this.getHiddenMaterial();
        material.packedNormals = true;
        const fragList = this.viewer.model.getFragmentList();
        return { material, fragList };
    }

    private getHiddenMaterial() {
        return new THREE.MeshBasicMaterial({
            color: new THREE.Color('rgb(255, 250, 250)'),
            transparent: true,
            opacity: 0.2,
            reflectivity: 0,
            needsUpdate: true,
            alphaTest: 0.5,
        } as any);
    }



    private spaceColorChange(spacesToHighlight: { name: string; color: number[], dbid: number }[]) {

        spacesToHighlight.forEach(spaceH => {
            const spaceHNumber = spaceH.name.replace(/\b0+/g, '').split(' ')[0];
            const spaceDetails = {
                name: spaceH.name,
                number: spaceHNumber,
            };
            this.changeSpaceMaterial(
                [spaceH.dbid],
                spaceH.color,
                spaceDetails,
            );
        });
    }

    private uncolor(uuid: string) {
        this.selectionProxies
        const object = this.viewer.impl.sceneAfter.getObjectByProperty('uuid', uuid) as any;
        object.geometry?.dispose();
        object.material?.dispose();
        // scene.remove( object );

        this.viewer.impl.sceneAfter.remove(object);

        this.viewer.impl.invalidate(true, true, true);
    }

    private changeSpaceMaterial(dbIds: number[], color: number[], spaceDetails: { name: string; number: string }): void {
        const colorObj = new THREE.Color(`rgb(${color[0]},${color[1]},${color[2]})`);
        dbIds.forEach(dbId => {
            this.instanceTree.enumNodeFragments(dbId, (frag: any) => {
                // this part colors the rooms
                this.highlightFragment(this.viewer.model, frag, dbId, colorObj, spaceDetails);
            });
        });
        this.viewer.impl.invalidate(true, true, true);
    }

    private highlightFragment(
        model: any,
        fragId: number,
        dbId: number,
        color: any,
        spaceDetails: { name: string; number: string },
        a = false
    ) {
        const mesh = (this.viewer as any).impl.getRenderProxy(model, fragId);
        if (!mesh || !mesh.geometry) {
            return;
        }

        const transparentMaterial = new THREE.MeshBasicMaterial({
            color,
            opacity: a ? 0 : 1,
            depthTest: true,
            transparent: a,
        });

        this.viewer.impl.matman().addMaterial('transparent', transparentMaterial, true);
        const geom = mesh.geometry;
        // adding non-native properties to the mesh in order to identify it more easily
        const selectionProxy: any = new THREE.Mesh(geom, transparentMaterial);
        selectionProxy.name = spaceDetails.name;
        selectionProxy.number = spaceDetails.number;
        selectionProxy.matrix.copy(mesh.matrixWorld);
        selectionProxy.matrixAutoUpdate = false;
        selectionProxy.matrixWorldNeedsUpdate = true;

        selectionProxy._lmv_highlightCount = 1;
        selectionProxy.frustumCulled = false;
        selectionProxy.model = model;
        selectionProxy.fragId = fragId;
        selectionProxy.dbId = dbId;
        this.viewer.impl.sceneAfter.add(selectionProxy);
        // we save the colored rooms int selectionProxies
        this.selectionProxies.push(selectionProxy);
    }

}
