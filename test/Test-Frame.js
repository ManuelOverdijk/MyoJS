var MyoJS = require('../src/Index.js'),
    assert = require('chai').assert;
    _ = require('underscore');

var frameDump = '{ "frame" : { "id" : 43928, "timestamp" : 1423842951, "rssi" : 53, "event" : { "type" : "onConnect" }, "rotation" : [ -0.4093628, -0.1088257, 0.1548462, 0.8925171 ], "euler" : { "roll" : 1.34422, "pitch" : -1.428455, "yaw" : 2.271631 }, "pose" : { "type" : 5 }, "gyro" : [ 2.868652, -2.868652, 2.563476 ], "accel" : [ 0.04736328, -0.7241211, 0.6367188 ] }}';

describe('Frame', function(){
    describe('End to End', function(){
        var frame = new MyoJS.Frame(JSON.parse(frameDump).frame);
        it('should have id', function(){ assert.equal(frame.id, 43928, 'id found') });
        it('should have timestamp', function(){ assert.equal(frame.timestamp, 1423842951, 'timestamp found') });
        it('should have rssi', function(){ assert.equal(frame.rssi, 53, 'rssi found') });
        it('should make a valid frame type', function(){ assert.equal(frame.type, 'frame', 'frame type is matching') });

        describe('frame.euler', function() {
            it('should have euler roll', function(){ assert.equal(frame.euler.roll, 1.34422, 'roll is matching') });
            it('should have euler pitch', function(){ assert.equal(frame.euler.pitch, -1.428455, 'pitch is matching') });
            it('should have euler yaw', function(){ assert.equal(frame.euler.yaw, 2.271631, 'yaw is matching') });
        });

        describe('frame.accel (Vector3)', function() {
            it('should have x', function(){ assert.equal(frame.accel.x, 0.04736328, 'x is matching') });
            it('should have y', function(){ assert.equal(frame.accel.y, -0.7241211, 'y is matching') });
            it('should have z', function(){ assert.equal(frame.accel.z, 0.6367188, 'z is matching') });
        });

        describe('frame.gyro (Vector3)', function() {
            it('should have x', function(){ assert.equal(frame.gyro.x, 2.868652, 'x is matching') });
            it('should have y', function(){ assert.equal(frame.gyro.y, -2.868652, 'y is matching') });
            it('should have z', function(){ assert.equal(frame.gyro.z, 2.563476, 'z is matching') });
        });

        describe('frame.rotation (Quaternion)', function() {
            it('should have x', function(){ assert.equal(frame.rotation.x, -0.4093628, 'x is matching') });
            it('should have y', function(){ assert.equal(frame.rotation.y, -0.1088257, 'y is matching') });
            it('should have z', function(){ assert.equal(frame.rotation.z, 0.1548462, 'z is matching') });
            it('should have w', function(){ assert.equal(frame.rotation.w, 0.8925171, 'w is matching') });
        });

        it('should make a pose of type DOUBLE_TAP', function(){
            var pose = new MyoJS.Pose({invalid:true});
            assert.equal(frame.pose.type, pose.DOUBLE_TAP, 'Pose is POSE.DOUBLE_TAP');
        });
    });
});
