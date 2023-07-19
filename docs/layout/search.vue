<template>
  <div class="wot-search-input" :class="isWindows ? 'wot-search-input--win' : ''">
    <input type="text" class="wot-search-input__inner" id="search_input" placeholder="搜索文档" />
  </div>
</template>
<script>
import 'docsearch.js/dist/cdn/docsearch.min.css'
import docsearch from 'docsearch.js'
import { isWindows } from '../utils/index'

export default {
  data() {
    return {
      isWindows
    }
  },
  mounted() {
    docsearch({
      apiKey: '2e031c5218bf2d41b5b9aa75aec4f725',
      indexName: 'wot-design-uni',
      inputSelector: '#search_input',
      algoliaOptions: {
        hitsPerPage: 10
      },
      debug: false // Set debug to true if you want to inspect the dropdown
    })
  }
}
</script>

<style lang="scss">
@import '../assets/style/_variable.scss';

.wot-search-input {
  margin-right: 30px;
}
.wot-search-input__inner {
  display: block;
  width: 100%;
  padding: 7px 15px;
  font-size: inherit;
  color: #333;
  box-sizing: border-box;
  outline: none;
  border: 1px solid #e3e3e3;
  border-radius: 6px;
  &:hover {
    cursor: pointer;
  }
}
.wot-search-input--win {
  .algolia-autocomplete {
    .ds-dropdown-menu .ds-suggestions {
      overflow-y: auto;
      overflow-y: overlay;
      scrollbar-width: thin;
      scrollbar-color: rgba(0, 0, 0, 0) #fefefe;

      &::-webkit-scrollbar-track-piece {
        background-color: transparent;
      }
      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-thumb {
        width: 6px;
        opacity: 0.5;
        border-radius: 3px;
        background-color: transparent;
      }
      &:hover {
        &::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.2);
        }
        scrollbar-color: rgba(0, 0, 0, 0.2) #fefefe;
      }
    }
  }
}
.algolia-autocomplete {
  .algolia-docsearch-suggestion--title,
  .algolia-docsearch-suggestion--subcategory-column {
    line-height: 20px;
    font-size: 14px;
  }
  .algolia-docsearch-suggestion--title {
    font-weight: 500;
  }
  .algolia-docsearch-suggestion--wrapper {
    border-bottom: 1px solid #ddd;
    padding: 0;
  }
  .algolia-docsearch-suggestion--text .algolia-docsearch-suggestion--highlight,
  .algolia-docsearch-suggestion--highlight {
    color: $color-theme;
    background: rgba($color-theme-l7, 0.3);
    box-shadow: none;
  }
  .ds-dropdown-menu:before {
    width: 10px;
    height: 10px;
    top: -5px;
  }
  .ds-dropdown-menu [class^='ds-dataset-'] {
    padding: 0;
  }
  .algolia-docsearch-suggestion--category-header {
    margin-top: 4px;
  }
  .ds-dropdown-menu .ds-suggestions {
    margin-top: 4px;
  }
  .algolia-docsearch-footer {
    margin: 10px 8px 8px;
  }
  .ds-dropdown-menu .ds-suggestions {
    padding: 30px 8px 8px;
    max-height: 380px;
    overflow-y: auto;

    &::before {
      content: 'Search Result';
      position: absolute;
      top: -10px;
      left: 33px;
      font-weight: 500;
      font-size: 16px;
      color: #333;
    }
    &::after {
      content: '';
      position: absolute;
      top: 12px;
      left: 18px;
      width: 3px;
      height: 16px;
      background-color: $color-theme-l4;
    }
  }
}
</style>
