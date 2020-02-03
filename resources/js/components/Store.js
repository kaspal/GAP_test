import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const baseUrl = "http://homestead.test/";
const authData = {auth: {
                    username: 'my_user',
                    password: 'my_password'
                  }};

export default class Store extends Component {

    constructor(props){
      // variables
      super(props);
      this.state = {
        producto:[],
        productoBackup:[],
        textBuscar:'',
        formNombre:'',
        formDireccion:'',
        formPrecio:'',
        idStore:0,
        edit:false
      }
      // funciones de onchange de los campos en el formulario
      this.handleChangeNombre = this.handleChangeNombre.bind(this);
      this.handleChangeDir  = this.handleChangeDir.bind(this);

    }

    componentDidMount(){
      this.loadDataStore()
    }

    loadDataStore(){
      
      debugger
      axios.get(baseUrl+'services/stores', authData).then(response=>{
          this.setState({
            producto:response.data.Stores,
            productoBackup:response.data.Stores
          })
       }).catch(error=>{
         alert("Error "+error)
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
        const itemDataDir = item.address.toUpperCase()
        // juntarlos de titulo y direccion
        const itemData = itemDataNombre + " " + itemDataDir
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
    handleChangeDir(event) {
      this.setState({formDireccion: event.target.value});
    }

    render() {
        return (
          <div class="container">

            <h3>Admin section - Stores</h3>
            <div>
            <input class="form-control col-md-4" placeholder="Buscar..." value={this.state.text} onChange={(text) => this.filter(text)}/>
            <button type="button" class="btn btn-primary pull-right" onClick={()=>this.showModalCreate()}>Crear Tienda</button>
            </div>
            

            <table class="table table-bordered order-table ">
              <thead>
                <tr>
                <th>ID</th>
                  <th>Nombre Tienda</th>
                  <th>Direccion</th>
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
                     <label for="exampleInputEmail1">Nombre de tienda </label>
                     <input type="text" class="form-control" value={this.state.formNombre} onChange={this.handleChangeNombre} />
                    </div>
                    <div class="form-group">
                     <label for="exampleInputEmail1">Direccion</label>
                     <textarea class="form-control" rows="3" value={this.state.formDireccion} onChange={this.handleChangeDir}></textarea>
                    </div>
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
            </form>


          </div>
        );
    }

    showModalDelete(data){ 
      // id seleccionado para eliminar
      this.setState({ idStore:data.id })
      $("#exampleModalDelete").modal("show");
    }

    showModalEdit(data){
      //alert("mostrar modal "+JSON.stringify(data))
      this.setState({
        idStore:data.id,
        formNombre:data.name,
        formDireccion:data.address,
        edit:true
      })
      $("#exampleModal").modal("show");
    }

    showModalCreate(){
      this.setState({
        idStore:0,
        formNombre:"",
        formDireccion:"",
        formPrecio:"",
        edit:false
      })
      $("#exampleModal").modal("show");
    }

    sendNetworkProduct()
    {

      let formData = {
        'name': this.state.formNombre,
        'address': this.state.formDireccion
      }

      axios.post(baseUrl+'services/stores/create',formData, authData).then(response=>{

           if (response.data.success==true) {
             alert(response.data.total_elements)
             // para cargar datos de nuevo
             this.loadDataStore()
             // para cerrar el modal
             $("#exampleModal").modal("hide");
           }

       }).catch(error=>{
         alert("Error "+error)
       })

    }

    sendNetworkDelete(){

      const formData = new FormData()
      formData.append('id',this.state.idStore)
      //debugger
      axios.delete(baseUrl + 'services/stores/delete/' + this.state.idStore, authData).then(response=>{

           if (response.data.success==true) {
             alert("Registro borrado adecuadamente ... ")
             // para cargar datos de nuevo
             this.loadDataStore()
             // para cerrar el modal
             $("#exampleModalDelete").modal("hide");
           }

       }).catch(error=>{
         alert("Error "+error)
       })

    }

    sendNetworkUpdate(){

      let updData = {
        'id':this.state.idStore,
        'name':this.state.formNombre,
        'address':this.state.formDireccion
      }

      //debugger
      axios.put(baseUrl+'services/stores/update/', updData, authData).then(response=>{

           if (response.data.success==true) {
             alert(response.data.total_elements)
             // para cargar datos de nuevo
             this.loadDataStore()
             // para cerrar el modal
             $("#exampleModal").modal("hide");
           }

       }).catch(error=>{
         alert("Error 456"+error)
       })

    }

    listData(){

      return this.state.producto.map((data)=>{

        return(
          <tr>
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>{data.address}</td>
            <td>
              <button class="btn btn-info" onClick={()=>this.showModalEdit(data)}>Editar</button>
              
              <button class="btn btn-danger" onClick={()=>this.showModalDelete(data)}>Eliminar</button>
            </td>
          </tr>
        )

      })

    }
}

if (document.getElementById('store')) {
    ReactDOM.render(<Store />, document.getElementById('store'));
}
