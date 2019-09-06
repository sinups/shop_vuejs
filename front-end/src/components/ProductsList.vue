<template>
  <section class="products-list">
    <div class="container">
      <div class="group d-flex justify-content-end align-items-center">
        Сортировать по:
        <div class="btn-group ml-3" role="group" aria-label="Basic example">
          <button
            type="button"
            class="btn"
            :class="{'btn-primary':(sort==='name')}"
            @click="setSort('name')"
          >Имени</button>
          <button
            type="button"
            class="btn"
            :class="{'btn-primary':(sort==='price')}"
            @click="setSort('price')"
          >Цене</button>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-6 mb-4" v-for="(product, index) in products">
          <figure class="card card-product">
            <div class="open-modal" @click="getSingleItem(index)">
              <div class="img-wrap">
                <img :src="product.photo" :alt="product.name" class="card-img-top" />
              </div>
              <figcaption class="info-wrap">
                <h4 class="title">{{ product.name }}</h4>
                <p class="desc">{{ product.description }}</p>
              </figcaption>
            </div>
            <div class="bottom-wrap d-flex justify-content-between">
              <div class="price-wrap h5">
                <span class="price-new" v-price="product.price"></span>
              </div>
              <button
                class="btn btn-sm btn-primary float-right"
                @click="addToCart(product)"
              >В корзину</button>
            </div>
          </figure>
        </div>
      </div>
      <nav aria-label="Nav">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" @click.prevent="goPrev">Previous</a>
          </li>
          <li class="paging">Page {{page}} of {{maxPages}}</li>
          <li class="page-item">
            <a class="page-link" @click.prevent="goNext">Next</a>
          </li>
        </ul>
      </nav>
    </div>

    <div id="my-modal" class="modal fade">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Oбзор товара</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
               <div  >
                   <figure class=" card-sm card-product no-shadow">

                        <div class="img-wrap"> <img :src="currentProduct.photo"  class="card-img-top" /> </div>

                    </figure>

                    <h4 class="title">{{ currentProduct.name }}</h4>
                    <p class="desc">{{ currentProduct.description }}</p>
                     <div class="price-wrap h5">
                <span class="price-new">{{ currentProduct.price }} MDL</span>
              </div>
               </div>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-primary"  @click="addToCart(currentProduct)" data-dismiss="modal">В корзину</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "products-list",
  methods: {
    ...mapActions(["getProducts", "addProductToCart"]),
    addToCart(id) {
      this.addProductToCart(id);
    },
    getSingleItem(index) {
    //   this.getProducts(index);
      this.currentProduct = this.products[index];
      console.log(this.currentProduct = this.products[index]);
    //   console.log(this.getProducts(id))
      $("#my-modal").modal("show");
    },
    goPrev() {
      this.page = Math.max(1, --this.page);
      this.getProductsWithParams();
    },
    goNext() {
      this.page = Math.min(this.maxPages, ++this.page);
      this.getProductsWithParams();
    },
    setSort(opt) {
      this.order = this.sort === opt ? this.reverseOrder(this.order) : "asc";
      this.sort = opt;
      this.getProductsWithParams();
    },
    getProductsWithParams() {
      this.getProducts({
        _page: this.page,
        _sort: this.sort,
        _order: this.order
      });
    },
    reverseOrder(order) {
      return order === "asc" ? "desc" : "asc";
    }

  },
  computed: {
    ...mapGetters({
      products: "products"
    })
  },
  mounted() {
    this.getProducts({
      _page: this.page
    });
  },
  data() {
    return {
      page: 1,
      maxPages: 2,
      sort: "name",
      order: "asc",
      currentProduct: '',
    };
  }
};
</script>

<style scoped lang="scss">
h1 {
  margin-bottom: 20px;
}
.open-modal {
  cursor: pointer;
}
.pagination {
  padding: 30px 0;
  display: flex;
  justify-content: space-between;
}
.card {
  margin: 15px 0;
}
.paging {
  padding: 5px 0;
}
</style>
