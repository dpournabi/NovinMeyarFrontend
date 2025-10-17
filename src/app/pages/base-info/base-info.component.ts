

import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { UtilitiesService } from 'src/app/shared/services/core/utilities.service';
import { BaseInfoService } from 'src/app/shared/services/custom/base-info/base-info.service';
import '../../shared/services/core/array.extensions.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PropertyComponent } from './property.component';
import { IDatePickerConfig } from 'ng2-jalali-date-picker';

@Component({
  selector: 'base-info',
  templateUrl: 'base-info.component.html'
})

export class BaseInfoComponent implements OnInit {
  @ViewChild('myTree') myTree: NzTreeComponent;
  newNodeElement: ElementRef
  @ViewChild('newNodeInput') set content(content: ElementRef) {
    if (content) {
      this.newNodeElement = content;
      this.newNodeElement.nativeElement.focus();
    }
  };

  newNode: FormControl = new FormControl('', []);
  newNodeForm: FormGroup = new FormGroup({
    newNode: this.newNode
  });
  treeState: number = 0;
  selectedNode: any = null;
  selectedProps: Array<any> = null;
  isLoading: boolean = false;
  treeSearchPhrase: string = '';

  propertyId: FormControl = new FormControl('', []);
  value: FormControl = new FormControl('', []);
  detailPropertyForm: FormGroup = new FormGroup({
    propertyId: this.propertyId,
    value: this.value
  });
  datePickerConfig: IDatePickerConfig = {
    format: 'jYYYY/jMM/jDD'
  }

  constructor(private util: UtilitiesService, private service: BaseInfoService, private messageService: NzMessageService
    , private modal: NzModalService, private viewContainerRef: ViewContainerRef) {
    this.detailPropertyForm.disable();

    this.propertyId.valueChanges.subscribe(e => {
      console.log('property changed: ', e, this.properties);
      let selectedProperty = this.properties.filter(p => p.id == e);
      if (selectedProperty.length > 0) {
        this.selectedPropertyType = selectedProperty[0].type;
      }
    });
  }

  ngOnInit() {
    this.loadTree();
  }

  nodes = [];
  expandedNodeKeys = [];

  properties = [];
  selectedPropertyType: string = '';

  //............................................tree node click event....................[start]
  nzEvent(event: NzFormatEmitEvent): void {
    if (!event.node.origin.isNew) {
      this.treeState = 2;
      var selected = this.myTree.getSelectedNodeList();
      //console.log('tree: ', selected);
      this.selectedNode = selected[0];

      this.detailPropertyForm.enable();

      this.service.getItems(this.selectedNode.key).subscribe(resp => {
        //console.log('items: ', resp);
        if (resp.succeed) {
          this.selectedProps = resp.responseList;
        }
        else {
          this.messageService.error(resp.message);
        }
      }, err => {
        // console.error('items error: ', err);
        this.messageService.error(err.message);
      });
    }
  }
  //............................................tree node click event....................[end]

  //............................................tree crud click events...................[start]
  save(e) {
    this.isLoading = true;
    let savingData = {
      id: this.findNodeKey(),
      name: this.newNode.value,
      parentId: this.findParent(),
      level: this.findLevel()
    };
    this.service.addInfo(savingData).subscribe(resp => {
      let nodeData = {
        key: resp.exteraInformation,
        title: savingData.name,
        parentId: savingData.parentId,
        level: savingData.level,
        isNew: false,
        isLeaf: true
      };

      if (resp.succeed) {
        this.isLoading = false;

        this.addNode(nodeData);
      }
      else {
        this.messageService.error(resp.message);
      }

      this.newNode.reset();
      this.removeNode('newNode');
      this.treeState = 0;

      this.clearTreeSelectedNodes();
    }, err => {
      this.isLoading = false;
      console.log('error: ', err);
      this.messageService.error(`خطا در هنگام ذخیره سازی! - ${err}`);

      this.newNode.reset();
      this.removeNode('newNode');
      this.treeState = 0;

      this.clearTreeSelectedNodes();
    });
  }
  add(e) {
    this.addNode({
      key: 'newNode',
      title: '',
      isNew: true
    });
    this.treeState = 1;
  }
  remove(e) {
    if (window.confirm('آیا از حذف اطمینان دارید؟')) {
      this.isLoading = true;
      this.service.deactive(this.selectedNode.key).subscribe(resp => {
        this.isLoading = false;
        this.removeNode(this.selectedNode.key);
        this.clearTreeSelectedNodes();
        this.changeTree();
        this.treeState = 0;
      }, err => {
        this.isLoading = false;
        this.clearTreeSelectedNodes();
        this.changeTree();
        this.treeState = 0;

        console.log('error: ', err);
        this.messageService.error(`خطا در هنگام حذف! - ${err}`);
      });
    }
  }
  edit(e) {
    let editingNode = this.nodes.findTree(this.selectedNode.key, 'key', 'children');
    this.newNode.setValue(editingNode.title);
    editingNode.isNew = true;

    this.changeTree();
    this.treeState = 1;
  }
  //............................................tree crud click events...................[end]

  //............................................form actions.............................[start]
  loadTree() {
    this.service.getTree().subscribe(resp => {
      if (!resp.responseList || resp.responseList.length == 0) {
        return;
      }
      else {
        this.expandedNodeKeys = [];
        let mappedData = (resp.responseList as Array<any>).mapTree('childs', 'children', d => {
          if (d.level < 2) {
            this.expandedNodeKeys.push(d.id);
          }
          return {
            key: d.id,
            title: d.name,
            level: d.level,
            parentId: d.parentId,
            objectDetailProperties: d.objectDetailProperties,
            isLeaf: d.childs == null || d.childs.length == 0,
            code: d.code
          };
        });
        // console.log('tree resp: ', resp.responseList);
        // console.log('tree mapped: ', mappedData);

        this.nodes = mappedData;
        this.changeTree();
        this.selectedProps = null;
      }
    }, err => {
      console.error('get tree error: ', err);
      this.messageService.error('خطا در خواندن اطلاعات درخت!');
    });
  }
  addNode(data) {
    if (!this.selectedNode) {
      this.nodes.push(data);
    }
    else {
      let existing = this.nodes.findTree(this.selectedNode.key, 'key', 'children');
      if (existing.isNew == true) {
        //editing node
        existing.title = data.title;
        existing.isNew = false;
      }
      else {
        //adding node
        existing.isLeaf = false;
        existing.expanded = true;
        if (!existing.children) {
          existing.children = [data];
        }
        else {
          existing.children.push(data);
        }
      }
    }
    this.changeTree();
  }
  removeNode(key) {
    this.nodes.removeTree(key, 'key', 'children');
    this.changeTree();
  }
  changeTree() {
    this.myTree.ngOnChanges({
      nzData: {
        currentValue: this.nodes
      }
    } as any);
  }
  newNodeKeypress(e) {
    let key = e.which || e.keyCode;
    console.log(key);

    if (key == 27) { //esc key
      this.newNode.reset();
      this.removeNode('newNode');
      this.treeState = 0;
    }
    if (key == 13) {//enter key
      this.save(e);
    }
  }
  clearTreeSelectedNodes() {
    var selected = this.myTree.getSelectedNodeList();
    //console.log('tree: ', selected);

    for (const node of selected) {
      node.isSelected = false;
    }
    var selectedElements = document.querySelectorAll('.ant-tree-node-selected');
    for (let i = 0; i < selectedElements.length; i++) {
      const element = selectedElements[i];
      element.classList.remove('ant-tree-node-selected');
    }
    this.selectedNode = null;
    this.detailPropertyForm.disable();
  }
  findParent() {
    if (!this.selectedNode) {
      return null;
    }
    else {
      let existing = this.nodes.findTree(this.selectedNode.key, 'key', 'children');
      if (existing.isNew == true) {
        return existing.parentId;
      }
      return existing.key;
    }
  }
  findLevel() {
    if (!this.selectedNode) {
      return 0;
    }
    else {
      let level = 0;
      let existing = this.nodes.findTree(this.selectedNode.key, 'key', 'children');

      if (existing.isNew == true) {
        return existing.level;
      }

      while (existing != null) {
        level++;

        existing = this.nodes.findTree(existing.parentId, 'key', 'children');
      }

      return level;
    }
  }
  findNodeKey() {
    if (!this.selectedNode) {
      return 0;
    }
    let existing = this.nodes.findTree(this.selectedNode.key, 'key', 'children');
    if (existing.isNew == true) {
      //editing node
      return existing.key;
    }
    else {
      //adding node
      return 0;
    }
  }
  searchTree(e) {
    this.treeSearchPhrase = e.target.value;
  }
  searchCallback(node) {

    let input = document.getElementsByName('search-text')[0] as HTMLInputElement;
    if (input.value == '') {
      return false;
    }
    else {
      return (node.title.indexOf(input.value) > -1);
    }
  }
  //............................................form actions.............................[end]

  //............................................properties...............................[start]
  openProperties() {
    this.service.searchProperty({
      pageIndex: 0,
      pageSize: 999999999,
      "deleted": false
    }).subscribe(resp => {
      const modal = this.modal.create({
        nzTitle: 'تعریف ویژگی جدید',
        nzContent: PropertyComponent,
        nzViewContainerRef: this.viewContainerRef,
        nzOnOk: (e) => {
          var propForm = instance.propertyForm;

          if (propForm.invalid) {
            this.messageService.warning('مقادیر نوع و نام را وارد کنید.')
          }
          else {
            this.service.saveProperty(propForm.value).subscribe(resp => {
              console.log('save prop: ', resp);
              this.messageService.success('ویژگی با موفقیت ذخیره شد.');
            }, err => {
              console.error('error prop: ', err);
              this.messageService.error('بروز خطا!');
            });
          }
        }
      });
      const instance = modal.getContentComponent();
      instance.propData = resp.responseList
    }, err => {
      console.error('prop error: ', err);
      this.messageService.error('خطا در خواندن لیست ویژگی ها!');
    });
  }
  onPropInput(e) {
    this.service.searchProperty({
      pageIndex: 0,
      pageSize: 999999999,
      type: e.target.value,
      "deleted": false
    }).subscribe(resp => {
      console.log('prop resp: ', resp);

      if (resp.succeed) {
        this.properties = resp.responseList
      }
    }, err => {
      console.error('prop error: ', err);
    });
  }
  addProp() {
    var selected = this.nodes.findTree(this.selectedNode.key, 'key', 'children');
    if (selected.objectDetailProperties) {
      selected.objectDetailProperties.push({
        objectDetailId: selected.key,
        propertyId: this.propertyId.value,
        value: this.value.value.toString()
      })
    }
    else {
      selected.objectDetailProperties = [{
        objectDetailId: selected.key,
        propertyId: this.propertyId.value,
        value: this.value.value.toString()
      }];
    }
    
    let savingData = {
      id: selected.key,
      name: selected.title,
      parentId: selected.parentId,
      level: selected.level,
      objectDetailProperties: selected.objectDetailProperties
    };
    this.isLoading = true;
    this.service.addInfo(savingData).subscribe(resp => {
      // console.log('prop saved: ', resp);
      this.isLoading = false;
      if (resp.succeed) {
        this.messageService.success(resp.message);
        this.loadTree();
      }
      else {
        this.messageService.error(resp.message);
      }
      this.clearPropForm();
    }, err => {
      this.isLoading = false;
      console.error('error: ', err);
    });

  }
  clearPropForm() {
    this.detailPropertyForm.reset();
  }
  removeProp(prop) {
    // console.log('remove prop from: ', prop.propertyId, this.selectedNode);
    if (window.confirm('آیا از حذف این ویژگی اطمینان دارید؟')) {
      this.service.deactiveObjectDetailProperty(prop.id).subscribe(resp => {
        if (resp.succeed) {
          this.messageService.success('عملیات با موفقیت انجام شد.');

          this.selectedProps.removeTree(prop.id, 'id', null);
        }
      }, err => {
        console.log('deactive object detail property error:', err);
        this.messageService.error('بروز خطا!');
      });
    }
  }
  propEdit(prop) {
    console.log('edit prop from: ', prop, this.selectedNode);

    this.properties.push({
      id: prop.propertyId,
      name: prop.propertyName
    });

    
    setTimeout(() => {
      this.propertyId.setValue(prop.propertyId);
      this.value.setValue(prop.value);
      this.selectedPropertyType = prop.propertyType;
    }, 300);
  }
  formatPropValue(prop) {
    if (prop.propertyType == 'date') {
      return this.service.toPersianDateTime(prop.value);
    }
    else {
      return prop.value;
    }
  }
  //............................................properties...............................[end]
}