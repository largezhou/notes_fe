<template>
  <v-list-tile @click="onClick" v-resize="onWindowResize">
    <span class="navbar-menu-icon"><v-icon>add</v-icon></span>
    <v-list-tile-title>开始看书</v-list-tile-title>

    <v-dialog
      v-model="modal"
      max-width="500px"
      :fullscreen="fullScreen"
    >
      <v-card>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click.native="modal = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>添加一本书</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="modal = true">
              <v-icon>save</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>

              <v-flex xs12>
                <v-text-field label="书名"/>
              </v-flex>

              <v-flex xs6>
                <v-text-field label="已读" type="number" min="0"/>
              </v-flex>
              <v-flex xs6>
                <v-text-field label="总页数" type="number" min="1"/>
              </v-flex>

              <v-flex xs12>
                <v-dialog
                  ref="startDatePicker"
                  v-model="startDatePicker"
                  :return-value.sync="startDate"
                  lazy
                  full-width
                  width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="startDate"
                    label="开始时间"
                    readonly
                    clearable
                  ></v-text-field>
                  <v-date-picker
                    v-model="startDate"
                    scrollable
                    locale="zh-cn"
                  >
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="startDatePicker = false">取消</v-btn>
                    <v-btn flat color="primary" @click="$refs.startDatePicker.save(startDate)">确定</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>

              <v-flex xs12>
                <v-text-field clearable label="封面" type="file" accept="image/*"/>
              </v-flex>
            </v-layout>
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

    startDate: '',
    startDatePicker: false,
  }),
  methods: {
    onClick() {
      this.modal = true
    },
    onWindowResize() {
      this.fullScreen = window.innerWidth < 600
    },
  },
}
</script>

<style scoped>

</style>
