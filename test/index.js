
var assert = require("assert");
describe('Sample Test Suite', function(){
  describe('Sample Test 1', function(){
    it('what?', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});