<template>
  <v-list-tile @click="onClick" v-resize="onWindowResize">
    <span class="navbar-menu-icon"><v-icon>add</v-icon></span>
    <v-list-tile-title>开始看书</v-list-tile-title>

    <v-dialog
      v-model="modal"
      max-width="500px"
      :fullscreen="fullScreen"
      persistent
    >
      <v-card>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click="onCancel">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>添加一本书</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="modal = true" @click="onSubmit">
              <v-icon>save</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-container grid-list-md>
            <v-form ref="form">
              <v-layout wrap>

                <v-flex xs12>
                  <v-text-field label="书名" v-model="form.title"/>
                </v-flex>

                <v-flex xs6>
                  <v-text-field label="已读" type="number" min="0" v-model="form.read"/>
                </v-flex>
                <v-flex xs6>
                  <v-text-field label="总页数" type="number" min="1" v-model="form.total"/>
                </v-flex>

                <v-flex xs12>
                  <v-dialog
                    ref="startDateModal"
                    v-model="startDateModal"
                    :return-value.sync="form.started_at"
                    lazy
                    full-width
                    width="290px"
                  >
                    <v-text-field
                      v-model="form.started_at"
                      slot="activator"
                      label="开始时间"
                      readonly
                      clearable
                    ></v-text-field>
                    <v-date-picker
                      v-model="form.started_at"
                      scrollable
                      locale="zh-cn"
                    >
                      <v-spacer/>
                      <v-btn flat color="primary" @click="startDateModal = false">取消</v-btn>
                      <v-btn flat color="primary" @click="$refs.startDateModal.save(form.started_at)">确定</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-flex>

                <v-flex xs12>
                  <v-text-field v-model="form.cover" clearable label="封面" type="file" accept="image/*"/>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-list-tile>
</template>

<script>
export default {
  name: 'NewBook',
  data: () => ({
    modal: false,
    fullScreen: false,

    startDateModal: false,

    form: {
      title: '',
      read: '',
      total: '',
      started_at: '',
      cover: '',
    },
  }),
  methods: {
    onClick() {
      this.modal = true
    },
    onWindowResize() {
      this.fullScreen = window.innerWidth < 600
    },
    onSubmit() {
      log(this.form)
    },
    onCancel() {
      this.modal = false
      this.$refs.form.reset()
    },
  },
}
</script>

<style scoped>

</style>
