import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const baseUrl = "http://homestead.test/";
const authData = {auth: {
                    username: 'my_user',
                    password: 'my_password'
                  }};

export default class Article extends Component {

    constructor(props){
      // variables
      super(props);
      this.state = {
        producto:[],
        storesData: [],
        productoBackup:[],
        textBuscar:'',
        formNombre:'',
        formDesc:'',
        formPrice:'',
        formShelf:'',
        formVault:'',
        formStore:'',
        idArticle:0,
        edit:false
      }
      // funciones de onchange de los campos en el formulario
      this.handleChangeNombre = this.handleChangeNombre.bind(this);
      this.handleChangeDesc  = this.handleChangeDesc.bind(this);
      this.handleChangePrice = this.handleChangePrice.bind(this);
      this.handleChangeShelf  = this.handleChangeShelf.bind(this);
      this.handleChangeVault = this.handleChangeVault.bind(this);
      this.handleChangeStore  = this.handleChangeStore.bind(this);

    }

    componentDidMount(){
      this.loadDataArticle()
      this.loadDataStore()
    }

    loadDataArticle() {

      
      axios.get(baseUrl + 'services/articles', authData).then(response => {
        this.setState({
          producto: response.data.Articles,
          productoBackup: response.data.Articles
        })
      }).catch(error => {
        alert("Error " + error)
      })
  
    }
  
    loadDataStore() {
  
      axios.get(baseUrl + 'services/stores', authData).then(response => {
        this.setState({
          storesData: response.data.Stores
        })
      }).catch(error => {
        alert("Error " + error)
      })
  
    }

    filter(event) {

      console.log(event.target.value)
      // obtener datos de buscar
      var text = event.target.value
      // obtener datos de array
      const data = this.state.productoBackup
  
      const newData = data.filter(function (item) {
        // variable de titulo
        const itemDataNombre = item.name.toUpperCase()
        // variable de direccion
        const itemDataDesc = item.description.toUpperCase()
        // juntarlos de titulo y direccion
        const itemData = itemDataNombre + " " + itemDataDesc
        // variable de buscar
        const textData = text.toUpperCase()
        // filtrar su es verdadero o no y lo devuelve
        return itemData.indexOf(textData) > -1
      })
  
      this.setState({ producto: newData })
  
    }

    // campo de nombre
    handleChangeNombre(event) {
      this.setState({formNombre: event.target.value});
    }

    //campo de descripcion
    handleChangeDesc(event) {
      this.setState({formDesc: event.target.value});
    }

    //campo de precio
    handleChangePrice(event) {
      this.setState({formPrice: event.target.value});
    }

    //campo de vitrina
    handleChangeShelf(event) {
      this.setState({formShelf: event.target.value});
    }
    //campo de bodega
    handleChangeVault(event) {
      this.setState({formVault: event.target.value});
    }

    //campo de tienda id
    handleChangeStore(event) {
      this.setState({formStore: event.target.value});
    }

    render() {
        return (
          <div class="container">

            <h3>Admin section - Articles</h3>
            <div>
            <input class="form-control col-md-4" placeholder="Buscar..." value={this.state.text} onChange={(text) => this.filter(text)}/>
            <button type="button" class="btn btn-primary pull-right" onClick={()=>this.showModalCreate()}>Crear Articulo</button>
            </div>
            

            <table class="table table-bordered order-table ">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre Articulo</th>
                  <th>Descripcion</th>
                  <th>Precio</th>
                  <th># En Mostrador</th>
                  <th># En Bodega</th>
                  <th>Tienda</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody id="bodytable">
                  {this.listData()}
              </tbody>
            </table>

            <div class="modal fade" id="exampleModalDelete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">

                <div class="modal-content">

                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Eliminar</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <p>Esta seguro desea de eliminar un regsitro?</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" onClick={()=>this.sendNetworkDelete()}>Eliminar</button>
                  </div>
                </div>

              </div>
            </div>


            <form>
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Formulario de tiendas</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="form-group">
                     <label htmlFor="exampleInputEmail1">Nombre de Articulo </label>
                     <input type="text" class="form-control" value={this.state.formNombre} onChange={this.handleChangeNombre} />
                    </div>
                    <div class="form-group">
                     <label htmlFor="exampleInputEmail1">Descripcion</label>
                     <textarea class="form-control" rows="3" value={this.state.formDesc} onChange={this.handleChangeDesc}></textarea>
                    </div>
                    <div class="form-group">
                     <label htmlFor="exampleInputEmail1">Precio </label>
                     <input type="text" class="form-control" value={this.state.formPrice} onChange={this.handleChangePrice} />
                    </div>
                    <div class="form-group">
                     <label htmlFor="exampleInputEmail1"># En Mostrador </label>
                     <input type="text" class="form-control" value={this.state.formShelf} onChange={this.handleChangeShelf} />
                    </div>
                    <div class="form-group">
                     <label htmlFor="exampleInputEmail1"># En Bodega </label>
                     <input type="text" class="form-control" value={this.state.formVault} onChange={this.handleChangeVault} />
                    </div>
                    <div class="form-group">
                    <label htmlFor="exampleInputEmail1">Nombre Tienda</label>
                    <select class="form-control" onChange={this.handleChangeStore}>
                        {this.listStoreData()}
                    </select>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>

                    {
                      this.state.edit?
                      <button type="button" class="btn btn-primary" onClick={()=>this.sendNetworkUpdate()}>Actualizar</button>
                      :
                      <button type="button" class="btn btn-primary" onClick={()=>this.sendNetworkProduct()}>Guardar</button>
                    }
                  </div>
                </div>
              </div>
            </div>
            </div>
            </form>


          </div>
        );
    }

    showModalDelete(data){ 
      // id seleccionado para eliminar
      this.setState({ idArticle:data.id })
      $("#exampleModalDelete").modal("show");
    }

    showModalEdit(data){
      //alert("mostrar modal "+JSON.stringify(data))
      this.setState({
        idArticle:data.id,
        formNombre:data.name,
        formDesc:data.description,
        formPrice:data.price,
        formShelf:data.total_in_shelf,
        formVault:data.total_in_vault,
        formStore:data.store_id,
        edit:true
      })
      $("#exampleModal").modal("show");
    }

    showModalCreate(){
      this.setState({
        idArticle:0,
        formNombre:"",
        formDesc:'',
        formPrice:'',
        formShelf:'',
        formVault:'',
        formStore:'',
        edit:false
      })
      $("#exampleModal").modal("show");
    }

    sendNetworkProduct()
    {

      let formData = {
        'name': this.state.formNombre,
        'description': this.state.formDesc,
        'price': this.state.formPrice,
        'total_in_vault': this.state.formVault,
        'total_in_shelf': this.state.formShelf,
        'store_id': this.state.formStore
      }

      axios.post(baseUrl+'services/articles/create',formData, authData).then(response=>{

           if (response.data.success==true) {
             alert(response.data.total_elements)
             // para cargar datos de nuevo
             this.loadDataArticle()
             // para cerrar el modal
             $("#exampleModal").modal("hide");
           }

       }).catch(error=>{
         alert("Error "+error)
       })

    }

    sendNetworkDelete(){

      const formData = new FormData()
      formData.append('id',this.state.idArticle)
      //debugger
      axios.delete(baseUrl + 'services/articles/delete/' + this.state.idArticle, authData).then(response=>{

           if (response.data.success==true) {
             alert("Registro borrado adecuadamente ... ")
             // para cargar datos de nuevo
             this.loadDataArticle()
             // para cerrar el modal
             $("#exampleModalDelete").modal("hide");
           }

       }).catch(error=>{
         alert("Error "+error)
       })

    }

    sendNetworkUpdate(){

      let updData = {
        'id':this.state.idArticle,
        'name':this.state.formNombre,
        'description':this.state.formDesc,
        'price':this.state.formPrice,
        'total_in_shelf':this.state.formShelf,
        'total_in_vault':this.state.formVault,
        //'store_id':this.state.formStore,
      }

      debugger
      axios.put(baseUrl+'services/articles/update', updData, authData).then(response=>{

           if (response.data.success==true) {
             alert(response.data.total_elements)
             // para cargar datos de nuevo
             this.loadDataArticle()
             // para cerrar el modal
             $("#exampleModal").modal("hide");
           }

       }).catch(error=>{
         alert("Error 456"+error)
       })

    }

    listData() {

      return this.state.producto.map((data) => {
        //debugger
        return (
          <tr>
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>{data.description}</td>
            <td>{data.price}</td>
            <td>{data.total_in_shelf}</td>
            <td>{data.total_in_vault}</td>
            <td>{data.store_name}</td>
            <td>
              <button class="btn btn-info" onClick={()=>this.showModalEdit(data)}>Editar</button>
              
              <button class="btn btn-danger" onClick={()=>this.showModalDelete(data)}>Eliminar</button>
            </td>
          </tr>
        )
  
      })
  
    }
  
    
    listStoreData() {
  
      return this.state.storesData.map((data) => {
  
        return (
          //(data.id == $this.state.formStore) ? <option value={data.id} selected>{data.name}</option>
          <option value={data.id}>{data.name}</option>
        )
  
      })
  
    }
}

if (document.getElementById('article')) {
    ReactDOM.render(<Article />, document.getElementById('article'));
}
