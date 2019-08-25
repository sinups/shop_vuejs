<template>
<div id="my-modal" class="modal fade">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Oбзор товара</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
               <div  v-for="single in singles">
                    <img :src="single.photo" :alt="single.name" class="card-img-top" />
                    <h4 class="title">{{ single.name }}</h4>
                    <p class="desc">{{ single.description }}</p>
               </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary">Save changes</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
</template>
