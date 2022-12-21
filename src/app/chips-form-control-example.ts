import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { CdkDragEnd, CdkDragDrop } from '@angular/cdk/drag-drop';

/**
 * @title Chips with form control
 */
@Component({
  selector: 'chips-form-control-example',
  templateUrl: 'chips-form-control-example.html',
  styleUrls: ['chips-form-control-example.css'],
})
export class ChipsFormControlExample {
  Object = Object;
  selectedElems: any = {
    city: { startX: 0, startY: 0, captions: []},
    caption: { startX: 0, startY: 0, captions: [] },
  };

  onDragEnded(reelID: string, event: CdkDragEnd) {
    if (reelID == null || event == null) return;
    const element = event.source.element.nativeElement;
    const transform = element.style.transform;
    let regex =
      /translate3d\(\s?(?<x>[-]?\d*)px,\s?(?<y>[-]?\d*)px,\s?(?<z>[-]?\d*)px\)/;
    var values = regex.exec(transform);
    if (values == null) return;
    this.selectedElems[reelID].startX = element.offsetLeft + +values[1];
    this.selectedElems[reelID].startY = element.offsetTop + +values[2];
    console.log(this.selectedElems[reelID]);
  }

  saveThePlan() {
    let request: any = {};
    request['elements'] = this.selectedElems;
    console.log(this.selectedElems);

    // video position and elements positions
    let positions : any = {}
    var e3 = document.getElementById("demoVideo");
    if (e3 != null) {
      positions['video'] = JSON.stringify(e3.getBoundingClientRect());
    }
    
    for (let key of Object.keys(this.selectedElems)) {
      var e = document.getElementById("object-" + key);
      if (e == null) {console.log('not found element');continue;}
      positions[key] = JSON.stringify(e.getBoundingClientRect())
    }
    request['positions'] = positions
    console.log(request)
  }

  keywords = ['angular', 'how-to', 'tutorial', 'accessibility'];
  formControl = new FormControl(Object.keys(this.selectedElems));

  removeKeyword(keyword: string) {
    const index = this.Object.keys(this.selectedElems).indexOf(keyword);
    console.log(index)
    if (index >= 0) {
      // this.keywords.splice(index, 1);
      delete this.selectedElems[keyword];
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.selectedElems[value] = { startX: 0, startY: 0 };
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeCaption(keyword: string, caption: string) {
    const index = this.selectedElems[keyword]['captions'].indexOf(caption);
    console.log(index)
    if (index >= 0) {
      // this.keywords.splice(index, 1);
      this.selectedElems[keyword]['captions'].splice(index, 1);
    }
  }

  addCaption(keyword: string, event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.selectedElems[keyword]['captions'].push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }
}

/**  Copyright 2022 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
