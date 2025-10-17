import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fast-reg-comment',
  templateUrl: './fast-reg-comment.component.html',
  styleUrls: ['./fast-reg-comment.component.scss']
})
export class FastRegCommentComponent implements OnInit {

  constructor(public router: Router) { }
  addcomment = new FormGroup({
    body: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {
  }
  Add() {

  }
}
