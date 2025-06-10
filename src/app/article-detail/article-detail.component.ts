// article-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';
import { catchError } from 'rxjs/operators';
import { Article, ArticleResponse } from '../models/article.model';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css'],
})
export class ArticleDetailComponent implements OnInit {
  article: Article | undefined; // Inicializado como indefinido

  constructor(private route: ActivatedRoute, private blogService: BlogService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const articleId = +params['id'];
      this.loadArticle(articleId);
    });
  }

  loadArticle(articleId: number) {
    this.blogService.getArticleById(articleId)
      .pipe(
        catchError(error => {
          console.error('Error al cargar el artículo', error);
          throw error;
        })
      )
      .subscribe(
        (response: ArticleResponse) => {
          this.article = response.articles[0]; // Selecciona el primer artículo del array
          console.log('Artículo cargado con éxito', this.article);
        },
        (error) => {
          console.error('Hubo un error al cargar el artículo.', error);
        }
      );
  }
}
