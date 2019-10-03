import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EnderecoService } from './../shared/endereco.service';
import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/core/shared/toast.service';

@ Component({
  selector: 'app-form-endereco',
  templateUrl: './form-endereco.page.html',
  styleUrls: ['./form-endereco.page.scss'],
})
export class FormEnderecoPage implements OnInit {
  formEndereco: FormGroup;
  key: string;

  constructor(private enderecoService: EnderecoService, private formbuilder: FormBuilder,
              private route: ActivatedRoute, private toast: ToastService,
              private router: Router) { }

  ngOnInit() {
    this.criarFormulario();
    let key = this.route.snapshot.paramMap.get('key');
    if (key) {
      const subscribe = this.enderecoService.getByKey(key).subscribe( (endereco: any) => {
        subscribe.unsubscribe();
        this.key = endereco.key;
        this.formEndereco.patchValue({
          cep: endereco.cep,
          logradouro: endereco.logradouro,
          numero: endereco.numero,
          complemento: endereco.complemento,
          bairro: endereco.bairro,
        });
      });
    }
  }

  criarFormulario() {
    this.key = null;
    this.formEndereco = this.formbuilder.group({
      cep: [''],
      logradouro: [''],
      numero: [''],
      complemento: [''],
      bairro: [''],
    });
  }
  // submeter os dados ao formulário
  onSubmit() {
    if (this.formEndereco.valid) {
      let result: Promise<{}>;
      if (this.key) {
        result = this.enderecoService.update(this.formEndereco.value, this.key);
      } else {
        result = this.enderecoService.insert(this.formEndereco.value);
      }

      result
      .then ( () => {
        this.toast.show('Endereço salvo com sucesso!!!');
        if (!this.key) {
          this.criarFormulario();
        }
        this.router.navigate(['/usuarios/enderecos']);
      })
      .catch( () => {
        this.toast.show('Erro ao salvar o endereço');
      });
    }
  }

}
