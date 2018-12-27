/* 2018-6-26 14:17:56 | 版权所有 合肥火星科技有限公司 http://www.marsgis.cn  【联系我们QQ：516584683，微信：marsgis】 */
!
function(e, t) {
	"object" == typeof exports && "object" == typeof module ? module.exports = t(require("Pangu")) : "function" == typeof define && define.amd ? define(["Pangu"], t) : "object" == typeof exports ? exports.CesiumGeometry = t(require("Pangu")) : e.CesiumGeometry = t(e.Pangu)
}("undefined" != typeof self ? self : this, function(i) {
	return function(i) {
		var n = {};

		function r(e) {
			if (n[e]) return n[e].exports;
			var t = n[e] = {
				i: e,
				l: !1,
				exports: {}
			};
			return i[e].call(t.exports, t, t.exports, r), t.l = !0, t.exports
		}
		return r.m = i, r.c = n, r.d = function(e, t, i) {
			r.o(e, t) || Object.defineProperty(e, t, {
				configurable: !1,
				enumerable: !0,
				get: i
			})
		}, r.n = function(e) {
			var t = e && e.__esModule ?
			function() {
				return e.
			default
			} : function() {
				return e
			};
			return r.d(t, "a", t), t
		}, r.o = function(e, t) {
			return Object.prototype.hasOwnProperty.call(e, t)
		}, r.p = "", r(r.s = 6)
	}([function(e, t) {
		e.exports = i
	}, function(e, t, i) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var o, n, r = {};
		o = /((?:.*\/)|^)cesiumGeometry[\w-]*\.js(?:\W|$)/i, n = void 0, r.getBaseUrl = function() {
			return void 0 === n && (n = function() {
				for (var e = document.getElementsByTagName("script"), t = 0, i = e.length; t < i; ++t) {
					var n = e[t].getAttribute("src"),
						r = o.exec(n);
					if (null !== r) return r[1]
				}
			}()), n
		}, t.util = r
	}, function(e, t, i) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.RectangularSensorPrimitive = void 0;
		var F = n(i(0)),
			W = n(i(8)),
			B = n(i(9)),
			G = n(i(10)),
			H = n(i(11));

		function n(e) {
			return e && e.__esModule ? e : {
			default:
				e
			}
		}
		var N = F.
	default.BoundingSphere,
			Y = F.
		default.Cartesian3,
			r = F.
		default.Color,
			f = F.
		default.combine,
			q = F.
		default.ComponentDatatype,
			o = F.
		default.defaultValue,
			a = F.
		default.defined,
			j = (F.
		default.defineProperties, F.
		default.destroyObject, F.
		default.DeveloperError),
			U = F.
		default.Matrix4,
			s = F.
		default.PrimitiveType,
			X = F.
		default.Buffer,
			Z = F.
		default.BufferUsage,
			l = F.
		default.DrawCommand,
			J = F.
		default.Pass,
			Q = F.
		default.RenderState,
			K = F.
		default.ShaderProgram,
			$ = F.
		default.ShaderSource,
			ee = F.
		default.VertexArray,
			te = F.
		default.BlendingState,
			ie = F.
		default.CullFace,
			u = F.
		default.Material,
			ne = F.
		default.SceneMode,
			re = F.
		default.VertexFormat,
			oe = F.
		default.Math,
			ae = F.
		default.Matrix3,
			se = (U = F.
		default.Matrix4, F.
		default.JulianDate),
			p = (F.
		default.BoxGeometry, F.
		default.EllipsoidGeometry, Math.sin),
			le = Math.cos,
			ue = Math.tan,
			ce = Math.atan,
			de = (Math.asin, {
				position: 0,
				normal: 1
			});

		function c(e) {
			var t = this;
			e = o(e, o.EMPTY_OBJECT), this.show = o(e.show, !0), this.slice = o(e.slice, 32), this.modelMatrix = U.clone(e.modelMatrix, new U), this._modelMatrix = new U, this._computedModelMatrix = new U, this._computedScanPlaneModelMatrix = new U, this.radius = o(e.radius, Number.POSITIVE_INFINITY), this._radius = void 0, this.xHalfAngle = o(e.xHalfAngle, 0), this._xHalfAngle = void 0, this.yHalfAngle = o(e.yHalfAngle, 0), this._yHalfAngle = void 0, this.lineColor = o(e.lineColor, r.WHITE), this.showSectorLines = o(e.showSectorLines, !0), this.showSectorSegmentLines = o(e.showSectorSegmentLines, !0), this.showLateralSurfaces = o(e.showLateralSurfaces, !0), this.material = a(e.material) ? e.material : u.fromType(u.ColorType), this._material = void 0, this._translucent = void 0, this.lateralSurfaceMaterial = a(e.lateralSurfaceMaterial) ? e.lateralSurfaceMaterial : u.fromType(u.ColorType), this._lateralSurfaceMaterial = void 0, this._lateralSurfaceTranslucent = void 0, this.showDomeSurfaces = o(e.showDomeSurfaces, !0), this.domeSurfaceMaterial = a(e.domeSurfaceMaterial) ? e.domeSurfaceMaterial : u.fromType(u.ColorType), this._domeSurfaceMaterial = void 0, this.showDomeLines = o(e.showDomeLines, !0), this.showIntersection = o(e.showIntersection, !0), this.intersectionColor = o(e.intersectionColor, r.WHITE), this.intersectionWidth = o(e.intersectionWidth, 5), this.showThroughEllipsoid = o(e.showThroughEllipsoid, !1), this._showThroughEllipsoid = void 0, this.showScanPlane = o(e.showScanPlane, !0), this.scanPlaneColor = o(e.scanPlaneColor, r.WHITE), this.scanPlaneMode = o(e.scanPlaneMode, "horizontal"), this.scanPlaneRate = o(e.scanPlaneRate, 10), this._scanePlaneXHalfAngle = 0, this._scanePlaneYHalfAngle = 0, this._time = se.now(), this._boundingSphere = new N, this._boundingSphereWC = new N, this._sectorFrontCommand = new l({
				owner: this,
				primitiveType: s.TRIANGLES,
				boundingVolume: this._boundingSphereWC
			}), this._sectorBackCommand = new l({
				owner: this,
				primitiveType: s.TRIANGLES,
				boundingVolume: this._boundingSphereWC
			}), this._sectorVA = void 0, this._sectorLineCommand = new l({
				owner: this,
				primitiveType: s.LINES,
				boundingVolume: this._boundingSphereWC
			}), this._sectorLineVA = void 0, this._sectorSegmentLineCommand = new l({
				owner: this,
				primitiveType: s.LINES,
				boundingVolume: this._boundingSphereWC
			}), this._sectorSegmentLineVA = void 0, this._domeFrontCommand = new l({
				owner: this,
				primitiveType: s.TRIANGLES,
				boundingVolume: this._boundingSphereWC
			}), this._domeBackCommand = new l({
				owner: this,
				primitiveType: s.TRIANGLES,
				boundingVolume: this._boundingSphereWC
			}), this._domeVA = void 0, this._domeLineCommand = new l({
				owner: this,
				primitiveType: s.LINES,
				boundingVolume: this._boundingSphereWC
			}), this._domeLineVA = void 0, this._scanPlaneFrontCommand = new l({
				owner: this,
				primitiveType: s.TRIANGLES,
				boundingVolume: this._boundingSphereWC
			}), this._scanPlaneBackCommand = new l({
				owner: this,
				primitiveType: s.TRIANGLES,
				boundingVolume: this._boundingSphereWC
			}), this._scanRadialCommand = void 0, this._colorCommands = [], this._frontFaceRS = void 0, this._backFaceRS = void 0, this._sp = void 0, this._uniforms = {
				u_type: function() {
					return 0
				},
				u_xHalfAngle: function() {
					return t.xHalfAngle
				},
				u_yHalfAngle: function() {
					return t.yHalfAngle
				},
				u_radius: function() {
					return t.radius
				},
				u_showThroughEllipsoid: function() {
					return t.showThroughEllipsoid
				},
				u_showIntersection: function() {
					return t.showIntersection
				},
				u_intersectionColor: function() {
					return t.intersectionColor
				},
				u_intersectionWidth: function() {
					return t.intersectionWidth
				},
				u_normalDirection: function() {
					return 1
				},
				u_lineColor: function() {
					return t.lineColor
				}
			}, this._scanUniforms = {
				u_xHalfAngle: function() {
					return t._scanePlaneXHalfAngle
				},
				u_yHalfAngle: function() {
					return t._scanePlaneYHalfAngle
				},
				u_radius: function() {
					return t.radius
				},
				u_color: function() {
					return t.scanPlaneColor
				},
				u_showThroughEllipsoid: function() {
					return t.showThroughEllipsoid
				},
				u_showIntersection: function() {
					return t.showIntersection
				},
				u_intersectionColor: function() {
					return t.intersectionColor
				},
				u_intersectionWidth: function() {
					return t.intersectionWidth
				},
				u_normalDirection: function() {
					return 1
				},
				u_lineColor: function() {
					return t.lineColor
				}
			}
		}
		c.prototype.update = function(e) {
			var t = e.mode;
			if (this.show && t === ne.SCENE3D) {
				var i = !1,
					n = !1,
					r = !1,
					o = this.xHalfAngle,
					a = this.yHalfAngle;
				if (o < 0 || a < 0) throw new j("halfAngle must be greater than or equal to zero.");
				if (0 != o && 0 != a) {
					this._xHalfAngle === o && this._yHalfAngle === a || (this._xHalfAngle = o, this._yHalfAngle = a, i = !0);
					var s = this.radius;
					if (s < 0) throw new j("this.radius must be greater than or equal to zero.");
					var l = !1;
					this._radius !== s && (l = !0, this._radius = s, this._boundingSphere = new N(Y.ZERO, this.radius)), (!U.equals(this.modelMatrix, this._modelMatrix) || l) && (U.clone(this.modelMatrix, this._modelMatrix), U.multiplyByUniformScale(this.modelMatrix, this.radius, this._computedModelMatrix), N.transform(this._boundingSphere, this.modelMatrix, this._boundingSphereWC));
					var u = this.showThroughEllipsoid;
					this._showThroughEllipsoid !== this.showThroughEllipsoid && (this._showThroughEllipsoid = u, n = !0);
					var c = this.material;
					this._material !== c && (this._material = c, r = n = !0);
					var d, f, h, p, m, _, v, y, g, w, C = c.isTranslucent();
					if (this._translucent !== C && (this._translucent = C, n = !0), this.showScanPlane) {
						var P = e.time,
							S = se.secondsDifference(P, this._time);
						S < 0 && (this._time = se.clone(P, this._time));
						var M, A = Math.max(S % this.scanPlaneRate / this.scanPlaneRate, 0);
						if ("horizontal" == this.scanPlaneMode) {
							var E = le(M = 2 * a * A - a),
								T = ue(o),
								x = ce(E * T);
							this._scanePlaneXHalfAngle = x, this._scanePlaneYHalfAngle = M, F.
						default.Matrix3.fromRotationX(this._scanePlaneYHalfAngle, fe)
						} else {
							M = 2 * o * A - o;
							var b = ue(a),
								L = le(M),
								D = ce(L * b);
							this._scanePlaneXHalfAngle = M, this._scanePlaneYHalfAngle = D, F.
						default.Matrix3.fromRotationY(this._scanePlaneXHalfAngle, fe)
						}
						F.
					default.Matrix4.multiplyByMatrix3(this.modelMatrix, fe, this._computedScanPlaneModelMatrix), U.multiplyByUniformScale(this._computedScanPlaneModelMatrix, this.radius, this._computedScanPlaneModelMatrix)
					}
					i &&
					function(e, t) {
						var i = t.context,
							n = pe(e, e.xHalfAngle, e.yHalfAngle),
							r = function(e, t) {
								var i = e.xHalfAngle,
									n = e.yHalfAngle,
									r = t.zoy,
									o = t.zox,
									a = [],
									s = ae.fromRotationY(i, fe);
								a.push(r.map(function(e) {
									return ae.multiplyByVector(s, e, new F.
								default.Cartesian3)
								}));
								var s = ae.fromRotationX(-n, fe);
								a.push(o.map(function(e) {
									return ae.multiplyByVector(s, e, new F.
								default.Cartesian3)
								}).reverse());
								var s = ae.fromRotationY(-i, fe);
								a.push(r.map(function(e) {
									return ae.multiplyByVector(s, e, new F.
								default.Cartesian3)
								}).reverse());
								var s = ae.fromRotationX(n, fe);
								return a.push(o.map(function(e) {
									return ae.multiplyByVector(s, e, new F.
								default.Cartesian3)
								})), a
							}(e, n);
						e.showLateralSurfaces && (e._sectorVA = function(e, t) {
							for (var i = Array.prototype.concat.apply([], t).length - t.length, n = new Float32Array(18 * i), r = 0, o = 0, a = t.length; o < a; o++) for (var s = t[o], l = Y.normalize(Y.cross(s[0], s[s.length - 1], he), he), u = 0, i = s.length - 1; u < i; u++) n[r++] = 0, n[r++] = 0, n[r++] = 0, n[r++] = -l.x, n[r++] = -l.y, n[r++] = -l.z, n[r++] = s[u].x, n[r++] = s[u].y, n[r++] = s[u].z, n[r++] = -l.x, n[r++] = -l.y, n[r++] = -l.z, n[r++] = s[u + 1].x, n[r++] = s[u + 1].y, n[r++] = s[u + 1].z, n[r++] = -l.x, n[r++] = -l.y, n[r++] = -l.z;
							var c = X.createVertexBuffer({
								context: e,
								typedArray: n,
								usage: Z.STATIC_DRAW
							}),
								d = 6 * Float32Array.BYTES_PER_ELEMENT,
								f = [{
									index: de.position,
									vertexBuffer: c,
									componentsPerAttribute: 3,
									componentDatatype: q.FLOAT,
									offsetInBytes: 0,
									strideInBytes: d
								}, {
									index: de.normal,
									vertexBuffer: c,
									componentsPerAttribute: 3,
									componentDatatype: q.FLOAT,
									offsetInBytes: 3 * Float32Array.BYTES_PER_ELEMENT,
									strideInBytes: d
								}];
							return new ee({
								context: e,
								attributes: f
							})
						}(i, r));
						e.showSectorLines && (e._sectorLineVA = function(e, t) {
							for (var i = t.length, n = new Float32Array(9 * i), r = 0, o = 0, a = t.length; o < a; o++) {
								var s = t[o];
								n[r++] = 0, n[r++] = 0, n[r++] = 0, n[r++] = s[0].x, n[r++] = s[0].y, n[r++] = s[0].z
							}
							var l = X.createVertexBuffer({
								context: e,
								typedArray: n,
								usage: Z.STATIC_DRAW
							}),
								u = 3 * Float32Array.BYTES_PER_ELEMENT,
								c = [{
									index: de.position,
									vertexBuffer: l,
									componentsPerAttribute: 3,
									componentDatatype: q.FLOAT,
									offsetInBytes: 0,
									strideInBytes: u
								}];
							return new ee({
								context: e,
								attributes: c
							})
						}(i, r));
						e.showSectorSegmentLines && (e._sectorSegmentLineVA = function(e, t) {
							for (var i = Array.prototype.concat.apply([], t).length - t.length, n = new Float32Array(9 * i), r = 0, o = 0, a = t.length; o < a; o++) for (var s = t[o], l = 0, i = s.length - 1; l < i; l++) n[r++] = s[l].x, n[r++] = s[l].y, n[r++] = s[l].z, n[r++] = s[l + 1].x, n[r++] = s[l + 1].y, n[r++] = s[l + 1].z;
							var u = X.createVertexBuffer({
								context: e,
								typedArray: n,
								usage: Z.STATIC_DRAW
							}),
								c = 3 * Float32Array.BYTES_PER_ELEMENT,
								d = [{
									index: de.position,
									vertexBuffer: u,
									componentsPerAttribute: 3,
									componentDatatype: q.FLOAT,
									offsetInBytes: 0,
									strideInBytes: c
								}];
							return new ee({
								context: e,
								attributes: d
							})
						}(i, r));
						e.showDomeSurfaces && (e._domeVA = (o = i, a = F.
					default.EllipsoidGeometry.createGeometry(new F.
					default.EllipsoidGeometry({
							vertexFormat: re.POSITION_ONLY,
							stackPartitions: 32,
							slicePartitions: 32
						})), ee.fromGeometry({
							context: o,
							geometry: a,
							attributeLocations: de,
							bufferUsage: Z.STATIC_DRAW,
							interleave: !1
						})));
						var o, a;
						e.showDomeLines && (e._domeLineVA = (s = i, l = F.
					default.EllipsoidOutlineGeometry.createGeometry(new F.
					default.EllipsoidOutlineGeometry({
							vertexFormat: re.POSITION_ONLY,
							stackPartitions: 32,
							slicePartitions: 32
						})), ee.fromGeometry({
							context: s,
							geometry: l,
							attributeLocations: de,
							bufferUsage: Z.STATIC_DRAW,
							interleave: !1
						})));
						var s, l;
						if (e.showScanPlane) if ("horizontal" == e.scanPlaneMode) {
							var u = pe(e, oe.PI_OVER_TWO, 0);
							e._scanPlaneVA = me(i, u.zox)
						} else {
							var u = pe(e, 0, oe.PI_OVER_TWO);
							e._scanPlaneVA = me(i, u.zoy)
						}
					}(this, e), n && (d = this, f = u, C ? (d._frontFaceRS = Q.fromCache({
						depthTest: {
							enabled: !f
						},
						depthMask: !1,
						blending: te.ALPHA_BLEND,
						cull: {
							enabled: !0,
							face: ie.BACK
						}
					}), d._backFaceRS = Q.fromCache({
						depthTest: {
							enabled: !f
						},
						depthMask: !1,
						blending: te.ALPHA_BLEND,
						cull: {
							enabled: !0,
							face: ie.FRONT
						}
					}), d._pickRS = Q.fromCache({
						depthTest: {
							enabled: !f
						},
						depthMask: !1,
						blending: te.ALPHA_BLEND
					})) : (d._frontFaceRS = Q.fromCache({
						depthTest: {
							enabled: !f
						},
						depthMask: !0
					}), d._pickRS = Q.fromCache({
						depthTest: {
							enabled: !0
						},
						depthMask: !0
					}))), r && (function(e, t, i) {
						var n = t.context,
							r = W.
						default,
							o = new $({
								sources: [G.
							default, i.shaderSource, B.
							default]
							});
						e._sp = K.replaceCache({
							context: n,
							shaderProgram: e._sp,
							vertexShaderSource: r,
							fragmentShaderSource: o,
							attributeLocations: de
						});
						var a = new $({
							sources: [G.
						default, i.shaderSource, B.
						default],
							pickColorQualifier: "uniform"
						});
						e._pickSP = K.replaceCache({
							context: n,
							shaderProgram: e._pickSP,
							vertexShaderSource: r,
							fragmentShaderSource: a,
							attributeLocations: de
						})
					}(h = this, p = e, m = c), h.showScanPlane && (_ = h, v = m, y = p.context, g = W.
				default, w = new $({
						sources: [G.
					default, v.shaderSource, H.
					default]
					}), _._scanePlaneSP = K.replaceCache({
						context: y,
						shaderProgram: _._scanePlaneSP,
						vertexShaderSource: g,
						fragmentShaderSource: w,
						attributeLocations: de
					}))), (n || r) &&
					function(e, t) {
						e._colorCommands.length = 0;
						var i = t ? J.TRANSLUCENT : J.OPAQUE;
						e.showLateralSurfaces && _e(e, e._sectorFrontCommand, e._sectorBackCommand, e._frontFaceRS, e._backFaceRS, e._sp, e._sectorVA, e._uniforms, e._computedModelMatrix, t, i);
						e.showSectorLines && _e(e, e._sectorLineCommand, void 0, e._frontFaceRS, e._backFaceRS, e._sp, e._sectorLineVA, e._uniforms, e._computedModelMatrix, t, i, !0);
						e.showSectorSegmentLines && _e(e, e._sectorSegmentLineCommand, void 0, e._frontFaceRS, e._backFaceRS, e._sp, e._sectorSegmentLineVA, e._uniforms, e._computedModelMatrix, t, i, !0);
						e.showDomeSurfaces && _e(e, e._domeFrontCommand, e._domeBackCommand, e._frontFaceRS, e._backFaceRS, e._sp, e._domeVA, e._uniforms, e._computedModelMatrix, t, i);
						e.showDomeLines && _e(e, e._domeLineCommand, void 0, e._frontFaceRS, e._backFaceRS, e._sp, e._domeLineVA, e._uniforms, e._computedModelMatrix, t, i, !0);
						e.showScanPlane && _e(e, e._scanPlaneFrontCommand, e._scanPlaneBackCommand, e._frontFaceRS, e._backFaceRS, e._scanePlaneSP, e._scanPlaneVA, e._scanUniforms, e._computedScanPlaneModelMatrix, t, i)
					}(this, C);
					var O = e.commandList,
						I = e.passes,
						z = this._colorCommands;
					if (I.render) for (var k = 0, V = z.length; k < V; k++) {
						var R = z[k];
						O.push(R)
					}
				}
			}
		};
		var fe = new ae,
			he = new Y;

		function pe(e, t, i) {
			for (var n = e.slice, r = le(i), o = ue(i), a = le(t), s = ue(t), l = ce(a * o), u = ce(r * s), c = [], d = 0; d < n; d++) {
				var f = 2 * l * d / (n - 1) - l;
				c.push(new Y(0, p(f), le(f)))
			}
			var h = [];
			for (d = 0; d < n; d++) {
				f = 2 * u * d / (n - 1) - u;
				h.push(new Y(p(f), 0, le(f)))
			}
			return {
				zoy: c,
				zox: h
			}
		}
		function me(e, t) {
			for (var i = t.length - 1, n = new Float32Array(9 * i), r = 0, o = 0; o < i; o++) n[r++] = 0, n[r++] = 0, n[r++] = 0, n[r++] = t[o].x, n[r++] = t[o].y, n[r++] = t[o].z, n[r++] = t[o + 1].x, n[r++] = t[o + 1].y, n[r++] = t[o + 1].z;
			var a = X.createVertexBuffer({
				context: e,
				typedArray: n,
				usage: Z.STATIC_DRAW
			}),
				s = 3 * Float32Array.BYTES_PER_ELEMENT,
				l = [{
					index: de.position,
					vertexBuffer: a,
					componentsPerAttribute: 3,
					componentDatatype: q.FLOAT,
					offsetInBytes: 0,
					strideInBytes: s
				}];
			return new ee({
				context: e,
				attributes: l
			})
		}
		function _e(e, t, i, n, r, o, a, s, l, u, c, d) {
			u && i && (i.vertexArray = a, i.renderState = r, i.shaderProgram = o, i.uniformMap = f(s, e._material._uniforms), i.uniformMap.u_normalDirection = function() {
				return -1
			}, i.pass = c, i.modelMatrix = l, e._colorCommands.push(i)), t.vertexArray = a, t.renderState = n, t.shaderProgram = o, t.uniformMap = f(s, e._material._uniforms), d && (t.uniformMap.u_type = function() {
				return 1
			}), t.pass = c, t.modelMatrix = l, e._colorCommands.push(t)
		}
		t.RectangularSensorPrimitive = c
	}, function(e, t, i) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.ConicArcSensorGeometry = void 0;
		var n, r = i(0),
			o = (n = r) && n.__esModule ? n : {
			default:
				n
			};
		var x = o.
	default.BoundingSphere,
			b = o.
		default.Cartesian3,
			a = o.
		default.Check,
			L = o.
		default.ComponentDatatype,
			s = o.
		default.defaultValue,
			D = (o.
		default.defined, o.
		default.Geometry),
			O = o.
		default.GeometryAttribute,
			I = o.
		default.GeometryAttributes,
			z = o.
		default.PrimitiveType,
			l = o.
		default.VertexFormat,
			k = o.
		default.Math,
			V = o.
		default.GeometryPipeline,
			R = o.
		default.IndexDatatype,
			F = (o.
		default.Ellipsoid, Math.cos),
			W = Math.sin;

		function u(e) {
			var t = (e = s(e, s.EMPTY_OBJECT)).angle,
				i = e.radius,
				n = Math.round(s(e.stackPartitions, 12)),
				r = Math.round(s(e.slicePartitions, 64));
			a.typeOf.number("angle", t), a.typeOf.number("radius", i);
			var o = s(e.vertexFormat, l.DEFAULT);
			this._angle = t, this._radius = i, this._stackPartitions = n, this._slicePartitions = r, this._vertexFormat = o
		}
		u.fromDimensions = function(e) {
			var t = (e = s(e, s.EMPTY_OBJECT)).angle,
				i = e.radius,
				n = e.stackPartitions,
				r = e.slicePartitions;
			return a.typeOf.number("angle", t), a.typeOf.number("radius", i), a.typeOf.number.greaterThanOrEquals("angle", t, 0), a.typeOf.number.greaterThanOrEquals("height", height, 0), new u({
				angle: t,
				radius: i,
				stackPartitions: n,
				slicePartitions: r,
				vertexFormat: e.vertexFormat
			})
		}, u.createGeometry = function(e) {
			console.time("createGeometry");
			var t, i = e._angle,
				n = e._radius,
				r = e._stackPartitions + 1,
				o = e._slicePartitions + 1,
				a = e._vertexFormat,
				s = new I,
				l = 3 * (o - 1) + 6 * (o - 1) * (r - 2) + 1 * (o - 1) * 3,
				u = r * o,
				c = R.createTypedArray(u, l),
				d = new Float64Array(3 * u + 3 * (o - 1) * 3);
			if (a.position) {
				for (var f = 0, h = new Array(o), p = new Array(o), m = 0; m < o; m++) {
					var _ = k.TWO_PI * m / (o - 1);
					h[m] = F(_), p[m] = W(_), d[f++] = 0, d[f++] = 0, d[f++] = -n
				}
				for (m = 1; m < r; m++) for (var v = i * m / (r - 1), y = W(v), g = n * y, w = n * y, C = n * F(v), P = 0; P < o; P++) d[f++] = h[P] * g, d[f++] = p[P] * w, d[f++] = -C;
				t = f;
				for (m = 0; m < o - 1; m++) d[f++] = 0, d[f++] = 0, d[f++] = 0, d[f++] = d[t - 3 * (o - m - 1)], d[f++] = d[t - 3 * (o - m - 1) + 1], d[f++] = d[t - 3 * (o - m - 1) + 2], d[f++] = d[t - 3 * (o - m)], d[f++] = d[t - 3 * (o - m) + 1], d[f++] = d[t - 3 * (o - m) + 2];
				s.position = new O({
					componentDatatype: L.DOUBLE,
					componentsPerAttribute: 3,
					values: d
				})
			}
			var S, M, A = 0;
			for (P = 0; P < o - 1; P++) c[A++] = o + P, c[A++] = o + P + 1, c[A++] = P + 1;
			for (m = 1; m < r - 1; m++) for (S = m * o, M = (m + 1) * o, P = 0; P < o - 1; P++) c[A++] = M + P, c[A++] = M + P + 1, c[A++] = S + P + 1, c[A++] = M + P, c[A++] = S + P + 1, c[A++] = S + P;
			m = 0;
			for (var E = 3 * (o - 1); m < E; m++) c[A++] = m + t / 3;
			var T = new D({
				attributes: s,
				indices: c,
				primitiveType: z.TRIANGLES,
				boundingSphere: new x(b.ZERO, n)
			});
			return T = V.computeNormal(T), console.timeEnd("createGeometry"), T
		}, t.ConicArcSensorGeometry = u
	}, function(e, t, i) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.ConicArcSensorOutlineGeometry = void 0;
		var n, r = i(0),
			o = (n = r) && n.__esModule ? n : {
			default:
				n
			};
		var M = o.
	default.BoundingSphere,
			A = o.
		default.Cartesian3,
			E = o.
		default.ComponentDatatype,
			a = o.
		default.defaultValue,
			s = (o.
		default.defined, o.
		default.DeveloperError),
			T = (o.
		default.Ellipsoid, o.
		default.Geometry),
			x = o.
		default.GeometryAttribute,
			b = o.
		default.GeometryAttributes,
			L = o.
		default.IndexDatatype,
			D = o.
		default.Math,
			O = o.
		default.PrimitiveType,
			I = (new A(1, 1, 1), Math.cos),
			z = Math.sin;

		function l(e) {
			var t = (e = a(e, a.EMPTY_OBJECT)).angle,
				i = e.radius,
				n = Math.round(a(e.stackPartitions, 10)),
				r = Math.round(a(e.slicePartitions, 8)),
				o = Math.round(a(e.subdivisions, 128));
			if (n < 1) throw new s("options.stackPartitions cannot be less than 1");
			if (r < 0) throw new s("options.slicePartitions cannot be less than 0");
			if (o < 0) throw new s("options.subdivisions must be greater than or equal to zero.");
			this._angle = t, this._radius = i, this._stackPartitions = n, this._slicePartitions = r, this._subdivisions = o
		}
		l.createGeometry = function(e) {
			var t = e._angle,
				i = e._radius;
			if (!(i <= 0 || t <= 0)) {
				var n, r, o, a, s, l, u = e._stackPartitions,
					c = e._slicePartitions,
					d = e._subdivisions,
					f = d * (u + c - 1),
					h = f - c + 2,
					p = new Float64Array(3 * h),
					m = L.createTypedArray(h, 2 * f),
					_ = 0,
					v = new Array(d),
					y = new Array(d);
				for (n = 0; n < d; n++) o = D.TWO_PI * n / d, v[n] = I(o), y[n] = z(o);
				for (n = 1; n < u; n++) for (s = I(a = t * n / (u - 1)), l = z(a), r = 0; r < d; r++) p[_++] = i * v[r] * l, p[_++] = i * y[r] * l, p[_++] = -i * s;
				for (v.length = c, y.length = c, n = 0; n < c; n++) o = D.TWO_PI * n / c, v[n] = I(o), y[n] = z(o);
				for (p[_++] = 0, p[_++] = 0, p[_++] = -i, n = 1; n < d; n++) for (s = I(a = t * n / d), l = z(a), r = 0; r < c; r++) p[_++] = i * v[r] * l, p[_++] = i * y[r] * l, p[_++] = -i * s;
				for (n = _ = 0; n < u - 1; ++n) {
					var g = n * d;
					for (r = 0; r < d - 1; ++r) m[_++] = g + r, m[_++] = g + r + 1;
					m[_++] = g + d - 1, m[_++] = g
				}
				var w = d * (u - 1);
				for (r = 1; r < c + 1; ++r) m[_++] = w, m[_++] = w + r;
				for (n = 0; n < d - 2; ++n) {
					var C = n * c + 1 + w,
						P = (n + 1) * c + 1 + w;
					for (r = 0; r < c - 1; ++r) m[_++] = P + r, m[_++] = C + r;
					m[_++] = P + c - 1, m[_++] = C + c - 1
				}
				var S = new b({
					position: new x({
						componentDatatype: E.DOUBLE,
						componentsPerAttribute: 3,
						values: p
					})
				});
				return new T({
					attributes: S,
					indices: m,
					primitiveType: O.LINES,
					boundingSphere: new M(A.ZERO, i)
				})
			}
		}, t.ConicArcSensorOutlineGeometry = l
	}, function(e, t, i) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.ConicArcSensorGraphics = void 0;
		var n, r = i(0),
			o = (n = r) && n.__esModule ? n : {
			default:
				n
			};
		var a = o.
	default.defaultValue,
			s = o.
		default.defined,
			l = o.
		default.defineProperties,
			u = o.
		default.DeveloperError,
			c = o.
		default.Event,
			d = o.
		default.createMaterialPropertyDescriptor,
			f = o.
		default.createPropertyDescriptor;

		function h(e) {
			this._angle = void 0, this._angleSubscription = void 0, this._radius = void 0, this._radiusSubscription = void 0, this._stack = void 0, this._stackSubscription = void 0, this._slice = void 0, this._sliceSubscription = void 0, this._color = void 0, this._colorSubscription = void 0, this._show = void 0, this._showSubscription = void 0, this._fill = void 0, this._fillSubscription = void 0, this._color = void 0, this._colorSubscription = void 0, this._material = void 0, this._materialSubscription = void 0, this._outline = void 0, this._outlineSubscription = void 0, this._outlineColor = void 0, this._outlineColorSubscription = void 0, this._outlineWidth = void 0, this._outlineWidthSubscription = void 0, this._shadows = void 0, this._shadowsSubscription = void 0, this._distanceDisplayCondition = void 0, this._distanceDisplayConditionSubscription = void 0, this._definitionChanged = new c, this._gaze = void 0, this._gazeSubscription = void 0, this.merge(a(e, a.EMPTY_OBJECT))
		}
		l(h.prototype, {
			definitionChanged: {
				get: function() {
					return this._definitionChanged
				}
			},
			show: f("show"),
			material: d("material"),
			fill: f("fill"),
			shadows: f("shadows"),
			distanceDisplayCondition: f("distanceDisplayCondition")
		}), h.prototype.clone = function(e) {
			return s(e) ? (e.angle = this.angle, e.radius = this.radius, e.stack = this.stack, e.slice = this.slice, e.show = this.show, e.material = this.material, e.color = this.color, e.fill = this.fill, e.outline = this.outline, e.outlineColor = this.outlineColor, e.outlineWidth = this.outlineWidth, e.shadows = this.shadows, e.distanceDisplayCondition = this.distanceDisplayCondition, e.gaze = this.gaze, e) : new h(this)
		}, h.prototype.merge = function(e) {
			if (!s(e)) throw new u("source is required.");
			this.angle = a(this.angle, e.angle), this.radius = a(this.radius, e.radius), this.stack = a(this.stack, e.stack), this.slice = a(this.slice, e.slice), this.show = a(this.show, e.show), this.color = a(this.color, e.color), this.material = a(this.material, e.material), this.fill = a(this.fill, e.fill), this.outline = a(this.outline, e.outline), this.outlineColor = a(this.outlineColor, e.outlineColor), this.outlineWidth = a(this.outlineWidth, e.outlineWidth), this.shadows = a(this.shadows, e.shadows), this.distanceDisplayCondition = a(this.distanceDisplayCondition, e.distanceDisplayCondition), this.gaze = a(this.gaze, e.gaze)
		}, t.ConicArcSensorGraphics = h
	}, function(e, t, i) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var n = i(7);
		Object.keys(n).forEach(function(e) {
			"default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
				enumerable: !0,
				get: function() {
					return n[e]
				}
			})
		});
		var r = i(17);
		Object.keys(r).forEach(function(e) {
			"default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
				enumerable: !0,
				get: function() {
					return r[e]
				}
			})
		});
		var o, a = i(0),
			s = (o = a) && o.__esModule ? o : {
			default:
				o
			},
			l = i(29);
		s.
	default.getLinkedPointList = l.getLinkedPointList
	}, function(e, t, i) {
		"use strict";
		var n, r = i(0),
			o = (n = r) && n.__esModule ? n : {
			default:
				n
			},
			a = i(2),
			s = i(12),
			l = i(13),
			u = i(3),
			c = i(4),
			d = i(5),
			f = i(15);
		o.
	default.RectangularSensorPrimitive = a.RectangularSensorPrimitive, o.
	default.RectangularSensorGraphics = s.RectangularSensorGraphics, o.
	default.RectangularSensorVisualizer = l.RectangularSensorVisualizer, o.
	default.ConicArcSensorGeometry = u.ConicArcSensorGeometry, o.
	default.ConicArcSensorOutlineGeometry = c.ConicArcSensorOutlineGeometry, o.
	default.ConicArcSensorGraphics = d.ConicArcSensorGraphics, o.
	default.ConicArcSensorCollection = f.ConicArcSensorCollection;
		var h = o.
	default.DataSourceDisplay,
			p = h.defaultVisualizersCallback;
		h.defaultVisualizersCallback = function(e, t, i) {
			var n = i.entities;
			return p(e, t, i).concat([new l.RectangularSensorVisualizer(e, n)])
		}
	}, function(e, t) {
		e.exports = "attribute vec4 position;\r\nattribute vec3 normal;\r\n\r\nvarying vec3 v_position;\r\nvarying vec3 v_positionWC;\r\nvarying vec3 v_positionEC;\r\nvarying vec3 v_normalEC;\r\n\r\nvoid main()\r\n{\r\n    gl_Position = czm_modelViewProjection * position;\r\n    v_position = vec3(position);\r\n    v_positionWC = (czm_model * position).xyz;\r\n    v_positionEC = (czm_modelView * position).xyz;\r\n    v_normalEC = czm_normal * normal;\r\n}"
	}, function(e, t) {
		e.exports = '#ifdef GL_OES_standard_derivatives\r\n    #extension GL_OES_standard_derivatives : enable\r\n#endif\r\n\r\nuniform bool u_showIntersection;\r\nuniform bool u_showThroughEllipsoid;\r\n\r\nuniform float u_radius;\r\nuniform float u_xHalfAngle;\r\nuniform float u_yHalfAngle;\r\nuniform float u_normalDirection;\r\nuniform float u_type;\r\n\r\nvarying vec3 v_position;\r\nvarying vec3 v_positionWC;\r\nvarying vec3 v_positionEC;\r\nvarying vec3 v_normalEC;\r\n\r\nvec4 getColor(float sensorRadius, vec3 pointEC)\r\n{\r\n    czm_materialInput materialInput;\r\n\r\n    vec3 pointMC = (czm_inverseModelView * vec4(pointEC, 1.0)).xyz;\r\n    materialInput.st = sensor2dTextureCoordinates(sensorRadius, pointMC);\r\n    materialInput.str = pointMC / sensorRadius;\r\n\r\n    vec3 positionToEyeEC = -v_positionEC;\r\n    materialInput.positionToEyeEC = positionToEyeEC;\r\n\r\n    vec3 normalEC = normalize(v_normalEC);\r\n    materialInput.normalEC = u_normalDirection * normalEC;\r\n\r\n    czm_material material = czm_getMaterial(materialInput);\r\n\r\n    return mix(czm_phong(normalize(positionToEyeEC), material), vec4(material.diffuse, material.alpha), 0.4);\r\n\r\n}\r\n\r\nbool isOnBoundary(float value, float epsilon)\r\n{\r\n    float width = getIntersectionWidth();\r\n    float tolerance = width * epsilon;\r\n\r\n#ifdef GL_OES_standard_derivatives\r\n    float delta = max(abs(dFdx(value)), abs(dFdy(value)));\r\n    float pixels = width * delta;\r\n    float temp = abs(value);\r\n    // There are a couple things going on here.\r\n    // First we test the value at the current fragment to see if it is within the tolerance.\r\n    // We also want to check if the value of an adjacent pixel is within the tolerance,\r\n    // but we don\'t want to admit points that are obviously not on the surface.\r\n    // For example, if we are looking for "value" to be close to 0, but value is 1 and the adjacent value is 2,\r\n    // then the delta would be 1 and "temp - delta" would be "1 - 1" which is zero even though neither of\r\n    // the points is close to zero.\r\n    return temp < tolerance && temp < pixels || (delta < 10.0 * tolerance && temp - delta < tolerance && temp < pixels);\r\n#else\r\n    return abs(value) < tolerance;\r\n#endif\r\n}\r\n\r\nvec4 shade(bool isOnBoundary)\r\n{\r\n    if (u_showIntersection && isOnBoundary)\r\n    {\r\n        return getIntersectionColor();\r\n    }\r\n    if(u_type == 1.0){\r\n        return getLineColor();\r\n    }\r\n    return getColor(u_radius, v_positionEC);\r\n}\r\n\r\nfloat ellipsoidSurfaceFunction(czm_ellipsoid ellipsoid, vec3 point)\r\n{\r\n    vec3 scaled = ellipsoid.inverseRadii * point;\r\n    return dot(scaled, scaled) - 1.0;\r\n}\r\n\r\nvoid main()\r\n{\r\n    vec3 sensorVertexWC = czm_model[3].xyz;      // (0.0, 0.0, 0.0) in model coordinates\r\n    vec3 sensorVertexEC = czm_modelView[3].xyz;  // (0.0, 0.0, 0.0) in model coordinates\r\n\r\n    //vec3 pixDir = normalize(v_position);\r\n    float positionX = v_position.x;\r\n    float positionY = v_position.y;\r\n    float positionZ = v_position.z;\r\n\r\n    vec3 zDir = vec3(0.0, 0.0, 1.0);\r\n    vec3 lineX = vec3(positionX, 0 ,positionZ);\r\n    vec3 lineY = vec3(0, positionY, positionZ);\r\n    float resX = dot(normalize(lineX), zDir);\r\n    if(resX < cos(u_xHalfAngle)-0.00001){\r\n        discard;\r\n    }\r\n    float resY = dot(normalize(lineY), zDir);\r\n    if(resY < cos(u_yHalfAngle)-0.00001){\r\n        discard;\r\n    }\r\n\r\n\r\n    czm_ellipsoid ellipsoid = czm_getWgs84EllipsoidEC();\r\n    float ellipsoidValue = ellipsoidSurfaceFunction(ellipsoid, v_positionWC);\r\n\r\n    // Occluded by the ellipsoid?\r\n\tif (!u_showThroughEllipsoid)\r\n\t{\r\n\t    // Discard if in the ellipsoid\r\n\t    // PERFORMANCE_IDEA: A coarse check for ellipsoid intersection could be done on the CPU first.\r\n\t    if (ellipsoidValue < 0.0)\r\n\t    {\r\n            discard;\r\n\t    }\r\n\r\n\t    // Discard if in the sensor\'s shadow\r\n\t    if (inSensorShadow(sensorVertexWC, ellipsoid, v_positionWC))\r\n\t    {\r\n\t        discard;\r\n\t    }\r\n    }\r\n\r\n    // Notes: Each surface functions should have an associated tolerance based on the floating point error.\r\n    bool isOnEllipsoid = isOnBoundary(ellipsoidValue, czm_epsilon3);\r\n    //isOnEllipsoid = false;\r\n    //if((resX >= 0.8 && resX <= 0.81)||(resY >= 0.8 && resY <= 0.81)){\r\n    /*if(false){\r\n        gl_FragColor = vec4(1.0,0.0,0.0,1.0);\r\n    }else{\r\n        gl_FragColor = shade(isOnEllipsoid);\r\n    }\r\n*/\r\n    gl_FragColor = shade(isOnEllipsoid);\r\n\r\n}'
	}, function(e, t) {
		e.exports = "uniform vec4 u_intersectionColor;\nuniform float u_intersectionWidth;\nuniform vec4 u_lineColor;\n\nbool inSensorShadow(vec3 coneVertexWC, czm_ellipsoid ellipsoidEC, vec3 pointWC)\n{\n    // Diagonal matrix from the unscaled ellipsoid space to the scaled space.    \n    vec3 D = ellipsoidEC.inverseRadii;\n\n    // Sensor vertex in the scaled ellipsoid space\n    vec3 q = D * coneVertexWC;\n    float qMagnitudeSquared = dot(q, q);\n    float test = qMagnitudeSquared - 1.0;\n    \n    // Sensor vertex to fragment vector in the ellipsoid's scaled space\n    vec3 temp = D * pointWC - q;\n    float d = dot(temp, q);\n    \n    // Behind silhouette plane and inside silhouette cone\n    return (d < -test) && (d / length(temp) < -sqrt(test));\n}\n\n///////////////////////////////////////////////////////////////////////////////\n\nvec4 getLineColor()\n{\n    return u_lineColor;\n}\n\nvec4 getIntersectionColor()\n{\n    return u_intersectionColor;\n}\n\nfloat getIntersectionWidth()\n{\n    return u_intersectionWidth;\n}\n\nvec2 sensor2dTextureCoordinates(float sensorRadius, vec3 pointMC)\n{\n    // (s, t) both in the range [0, 1]\n    float t = pointMC.z / sensorRadius;\n    float s = 1.0 + (atan(pointMC.y, pointMC.x) / czm_twoPi);\n    s = s - floor(s);\n    \n    return vec2(s, t);\n}\n"
	}, function(e, t) {
		e.exports = '#ifdef GL_OES_standard_derivatives\r\n    #extension GL_OES_standard_derivatives : enable\r\n#endif\r\n\r\nuniform bool u_showIntersection;\r\nuniform bool u_showThroughEllipsoid;\r\n\r\nuniform float u_radius;\r\nuniform float u_xHalfAngle;\r\nuniform float u_yHalfAngle;\r\nuniform float u_normalDirection;\r\nuniform vec4 u_color;\r\n\r\nvarying vec3 v_position;\r\nvarying vec3 v_positionWC;\r\nvarying vec3 v_positionEC;\r\nvarying vec3 v_normalEC;\r\n\r\nvec4 getColor(float sensorRadius, vec3 pointEC)\r\n{\r\n    czm_materialInput materialInput;\r\n\r\n    vec3 pointMC = (czm_inverseModelView * vec4(pointEC, 1.0)).xyz;\r\n    materialInput.st = sensor2dTextureCoordinates(sensorRadius, pointMC);\r\n    materialInput.str = pointMC / sensorRadius;\r\n\r\n    vec3 positionToEyeEC = -v_positionEC;\r\n    materialInput.positionToEyeEC = positionToEyeEC;\r\n\r\n    vec3 normalEC = normalize(v_normalEC);\r\n    materialInput.normalEC = u_normalDirection * normalEC;\r\n\r\n    czm_material material = czm_getMaterial(materialInput);\r\n\r\n    material.diffuse = u_color.rgb;\r\n    material.alpha = u_color.a;\r\n\r\n    return mix(czm_phong(normalize(positionToEyeEC), material), vec4(material.diffuse, material.alpha), 0.4);\r\n\r\n}\r\n\r\nbool isOnBoundary(float value, float epsilon)\r\n{\r\n    float width = getIntersectionWidth();\r\n    float tolerance = width * epsilon;\r\n\r\n#ifdef GL_OES_standard_derivatives\r\n    float delta = max(abs(dFdx(value)), abs(dFdy(value)));\r\n    float pixels = width * delta;\r\n    float temp = abs(value);\r\n    // There are a couple things going on here.\r\n    // First we test the value at the current fragment to see if it is within the tolerance.\r\n    // We also want to check if the value of an adjacent pixel is within the tolerance,\r\n    // but we don\'t want to admit points that are obviously not on the surface.\r\n    // For example, if we are looking for "value" to be close to 0, but value is 1 and the adjacent value is 2,\r\n    // then the delta would be 1 and "temp - delta" would be "1 - 1" which is zero even though neither of\r\n    // the points is close to zero.\r\n    return temp < tolerance && temp < pixels || (delta < 10.0 * tolerance && temp - delta < tolerance && temp < pixels);\r\n#else\r\n    return abs(value) < tolerance;\r\n#endif\r\n}\r\n\r\nvec4 shade(bool isOnBoundary)\r\n{\r\n    if (u_showIntersection && isOnBoundary)\r\n    {\r\n        return getIntersectionColor();\r\n    }\r\n    return getColor(u_radius, v_positionEC);\r\n}\r\n\r\nfloat ellipsoidSurfaceFunction(czm_ellipsoid ellipsoid, vec3 point)\r\n{\r\n    vec3 scaled = ellipsoid.inverseRadii * point;\r\n    return dot(scaled, scaled) - 1.0;\r\n}\r\n\r\nvoid main()\r\n{\r\n    vec3 sensorVertexWC = czm_model[3].xyz;      // (0.0, 0.0, 0.0) in model coordinates\r\n    vec3 sensorVertexEC = czm_modelView[3].xyz;  // (0.0, 0.0, 0.0) in model coordinates\r\n\r\n    //vec3 pixDir = normalize(v_position);\r\n    float positionX = v_position.x;\r\n    float positionY = v_position.y;\r\n    float positionZ = v_position.z;\r\n\r\n    vec3 zDir = vec3(0.0, 0.0, 1.0);\r\n    vec3 lineX = vec3(positionX, 0 ,positionZ);\r\n    vec3 lineY = vec3(0, positionY, positionZ);\r\n    float resX = dot(normalize(lineX), zDir);\r\n    if(resX < cos(u_xHalfAngle) - 0.0001){\r\n        discard;\r\n    }\r\n    float resY = dot(normalize(lineY), zDir);\r\n    if(resY < cos(u_yHalfAngle)- 0.0001){\r\n        discard;\r\n    }\r\n\r\n\r\n    czm_ellipsoid ellipsoid = czm_getWgs84EllipsoidEC();\r\n    float ellipsoidValue = ellipsoidSurfaceFunction(ellipsoid, v_positionWC);\r\n\r\n    // Occluded by the ellipsoid?\r\n\tif (!u_showThroughEllipsoid)\r\n\t{\r\n\t    // Discard if in the ellipsoid\r\n\t    // PERFORMANCE_IDEA: A coarse check for ellipsoid intersection could be done on the CPU first.\r\n\t    if (ellipsoidValue < 0.0)\r\n\t    {\r\n            discard;\r\n\t    }\r\n\r\n\t    // Discard if in the sensor\'s shadow\r\n\t    if (inSensorShadow(sensorVertexWC, ellipsoid, v_positionWC))\r\n\t    {\r\n\t        discard;\r\n\t    }\r\n    }\r\n\r\n    // Notes: Each surface functions should have an associated tolerance based on the floating point error.\r\n    bool isOnEllipsoid = isOnBoundary(ellipsoidValue, czm_epsilon3);\r\n    gl_FragColor = shade(isOnEllipsoid);\r\n\r\n}'
	}, function(e, t, i) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.RectangularSensorGraphics = void 0;
		var n, r = i(0),
			o = (n = r) && n.__esModule ? n : {
			default:
				n
			};
		var a = o.
	default.defaultValue,
			s = o.
		default.defined,
			l = o.
		default.defineProperties,
			u = o.
		default.DeveloperError,
			c = o.
		default.Event,
			d = o.
		default.createMaterialPropertyDescriptor,
			f = o.
		default.createPropertyDescriptor;

		function h(e) {
			this._show = void 0, this._radius = void 0, this._xHalfAngle = void 0, this._yHalfAngle = void 0, this._lineColor = void 0, this._showSectorLines = void 0, this._showSectorSegmentLines = void 0, this._showLateralSurfaces = void 0, this._material = void 0, this._showDomeSurfaces = void 0, this._showDomeLines = void 0, this._showIntersection = void 0, this._intersectionColor = void 0, this._intersectionWidth = void 0, this._showThroughEllipsoid = void 0, this._gaze = void 0, this._showScanPlane = void 0, this._scanPlaneColor = void 0, this._scanPlaneMode = void 0, this._scanPlaneRate = void 0, this._definitionChanged = new c, this.merge(a(e, a.EMPTY_OBJECT))
		}
		l(h.prototype, {
			definitionChanged: {
				get: function() {
					return this._definitionChanged
				}
			},
			show: f("show"),
			radius: f("radius"),
			xHalfAngle: f("xHalfAngle"),
			yHalfAngle: f("yHalfAngle"),
			lineColor: f("lineColor"),
			showSectorLines: f("showSectorLines"),
			showSectorSegmentLines: f("showSectorSegmentLines"),
			showLateralSurfaces: f("showLateralSurfaces"),
			material: d("material"),
			showDomeSurfaces: f("showDomeSurfaces"),
			showDomeLines: f("showDomeLines "),
			showIntersection: f("showIntersection"),
			intersectionColor: f("intersectionColor"),
			intersectionWidth: f("intersectionWidth"),
			showThroughEllipsoid: f("showThroughEllipsoid"),
			gaze: f("gaze"),
			showScanPlane: f("showScanPlane"),
			scanPlaneColor: f("scanPlaneColor"),
			scanPlaneMode: f("scanPlaneMode"),
			scanPlaneRate: f("scanPlaneRate")
		}), h.prototype.clone = function(e) {
			return s(e) || (e = new h), e.show = this.show, e.radius = this.radius, e.xHalfAngle = this.xHalfAngle, e.yHalfAngle = this.yHalfAngle, e.lineColor = this.lineColor, e.showSectorLines = this.showSectorLines, e.showSectorSegmentLines = this.showSectorSegmentLines, e.showLateralSurfaces = this.showLateralSurfaces, e.material = this.material, e.showDomeSurfaces = this.showDomeSurfaces, e.showDomeLines = this.showDomeLines, e.showIntersection = this.showIntersection, e.intersectionColor = this.intersectionColor, e.intersectionWidth = this.intersectionWidth, e.showThroughEllipsoid = this.showThroughEllipsoid, e.gaze = this.gaze, e.showScanPlane = this.showScanPlane, e.scanPlaneColor = this.scanPlaneColor, e.scanPlaneMode = this.scanPlaneMode, e.scanPlaneRate = this.scanPlaneRate, e
		}, h.prototype.merge = function(e) {
			if (!s(e)) throw new u("source is required.");
			this.show = a(this.show, e.show), this.radius = a(this.radius, e.radius), this.xHalfAngle = a(this.xHalfAngle, e.xHalfAngle), this.yHalfAngle = a(this.yHalfAngle, e.yHalfAngle), this.lineColor = a(this.lineColor, e.lineColor), this.showSectorLines = a(this.showSectorLines, e.showSectorLines), this.showSectorSegmentLines = a(this.showSectorSegmentLines, e.showSectorSegmentLines), this.showLateralSurfaces = a(this.showLateralSurfaces, e.showLateralSurfaces), this.material = a(this.material, e.material), this.showDomeSurfaces = a(this.showDomeSurfaces, e.showDomeSurfaces), this.showDomeLines = a(this.showDomeLines, e.showDomeLines), this.showIntersection = a(this.showIntersection, e.showIntersection), this.intersectionColor = a(this.intersectionColor, e.intersectionColor), this.intersectionWidth = a(this.intersectionWidth, e.intersectionWidth), this.showThroughEllipsoid = a(this.showThroughEllipsoid, e.showThroughEllipsoid), this.gaze = a(this.gaze, e.gaze), this.showScanPlane = a(this.showScanPlane, e.showScanPlane), this.scanPlaneColor = a(this.scanPlaneColor, e.scanPlaneColor), this.scanPlaneMode = a(this.scanPlaneMode, e.scanPlaneMode), this.scanPlaneRate = a(this.scanPlaneRate, e.scanPlaneRate)
		}, t.RectangularSensorGraphics = h
	}, function(e, t, i) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.RectangularSensorVisualizer = void 0;
		var n, r = i(0),
			C = (n = r) && n.__esModule ? n : {
			default:
				n
			},
			P = i(2),
			u = i(14);
		var o = C.
	default.AssociativeArray,
			S = C.
		default.Cartesian3,
			M = C.
		default.Color,
			A = C.
		default.defined,
			a = C.
		default.destroyObject,
			E = C.
		default.DeveloperError,
			T = C.
		default.Matrix3,
			x = C.
		default.Matrix4,
			b = C.
		default.Quaternion,
			L = C.
		default.MaterialProperty,
			D = C.
		default.Property,
			O = new T,
			I = (new x, new S),
			z = new S,
			k = new b,
			V = new S,
			R = new b,
			s = function e(t, i) {
				if (!A(t)) throw new E("scene is required.");
				if (!A(i)) throw new E("entityCollection is required.");
				i.collectionChanged.addEventListener(e.prototype._onCollectionChanged, this), this._scene = t, this._primitives = t.primitives, this._entityCollection = i, this._hash = {}, this._entitiesToVisualize = new o, this._onCollectionChanged(i, i.values, [], [])
			};
		s.prototype.update = function(e) {
			if (!A(e)) throw new E("time is required.");
			for (var t = this._entitiesToVisualize.values, i = this._hash, n = this._primitives, r = 0, o = t.length; r < o; r++) {
				var a, s, l, u, c = t[r],
					d = c._rectangularSensor,
					f = i[c.id],
					h = c.isShowing && c.isAvailable(e) && D.getValueOrDefault(d._show, e, !0);
				if (h && (a = D.getValueOrUndefined(c._position, e, I), w = D.getValueOrUndefined(c._orientation, e, k), s = D.getValueOrUndefined(d._radius, e), l = D.getValueOrUndefined(d._xHalfAngle, e), u = D.getValueOrUndefined(d._yHalfAngle, e), h = A(a) && A(l) && A(u)), h) {
					var p = A(f) ? f.primitive : void 0;
					A(p) || ((p = new P.RectangularSensorPrimitive).id = c, n.add(p), f = {
						primitive: p,
						position: void 0,
						orientation: void 0
					}, i[c.id] = f);
					var m = D.getValueOrUndefined(d._gaze, e);
					if (A(m)) {
						var _ = D.getValueOrUndefined(m._position, e, z);
						if (!A(a) || !A(_)) continue;
						var v = S.subtract(a, _, V),
							y = S.angleBetween(C.
						default.Cartesian3.UNIT_Z, v),
							g = S.cross(C.
						default.Cartesian3.UNIT_Z, v, V),
							w = b.fromAxisAngle(g, y - Math.PI, R);
						s = S.distance(a, _), p.modelMatrix = x.fromRotationTranslation(T.fromQuaternion(w, O), a, p.modelMatrix)
					} else S.equals(a, f.position) && b.equals(w, f.orientation) || (A(w) ? (p.modelMatrix = x.fromRotationTranslation(T.fromQuaternion(w, O), a, p.modelMatrix), f.position = S.clone(a, f.position), f.orientation = b.clone(w, f.orientation)) : (p.modelMatrix = C.
				default.Transforms.eastNorthUpToFixedFrame(a), f.position = S.clone(a, f.position)));
					p.show = !0, p.gaze = m, p.radius = s, p.xHalfAngle = l, p.yHalfAngle = u, p.lineColor = D.getValueOrDefault(d._lineColor, e, M.WHITE), p.showSectorLines = D.getValueOrDefault(d._showSectorLines, e, !0), p.showSectorSegmentLines = D.getValueOrDefault(d._showSectorSegmentLines, e, !0), p.showLateralSurfaces = D.getValueOrDefault(d._showLateralSurfaces, e, !0), p.material = L.getValue(e, d._material, p.material), p.showDomeSurfaces = D.getValueOrDefault(d._showDomeSurfaces, e, !0), p.showDomeLines = D.getValueOrDefault(d._showDomeLines, e, !0), p.showIntersection = D.getValueOrDefault(d._showIntersection, e, !0), p.intersectionColor = D.getValueOrDefault(d._intersectionColor, e, M.WHITE), p.intersectionWidth = D.getValueOrDefault(d._intersectionWidth, e, 1), p.showThroughEllipsoid = D.getValueOrDefault(d._showThroughEllipsoid, e, !0), p.scanPlaneMode = D.getValueOrDefault(d._scanPlaneMode, e), p.scanPlaneColor = D.getValueOrDefault(d._scanPlaneColor, e, M.WHITE), p.showScanPlane = D.getValueOrDefault(d._showScanPlane, e, !0), p.scanPlaneRate = D.getValueOrDefault(d._scanPlaneRate, e, 1)
				} else A(f) && (f.primitive.show = !1)
			}
			return !0
		}, s.prototype.isDestroyed = function() {
			return !1
		}, s.prototype.destroy = function() {
			for (var e = this._entitiesToVisualize.values, t = this._hash, i = this._primitives, n = e.length - 1; - 1 < n; n--)(0, u.removePrimitive)(e[n], t, i);
			return a(this)
		}, s.prototype._onCollectionChanged = function(e, t, i, n) {
			var r, o, a = this._entitiesToVisualize,
				s = this._hash,
				l = this._primitives;
			for (r = t.length - 1; - 1 < r; r--) o = t[r], A(o._rectangularSensor) && A(o._position) && a.set(o.id, o);
			for (r = n.length - 1; - 1 < r; r--) o = n[r], A(o._rectangularSensor) && A(o._position) ? a.set(o.id, o) : ((0, u.removePrimitive)(o, s, l), a.remove(o.id));
			for (r = i.length - 1; - 1 < r; r--) o = i[r], (0, u.removePrimitive)(o, s, l), a.remove(o.id)
		}, t.RectangularSensorVisualizer = s
	}, function(e, t, i) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.removePrimitive = function(e, t, i) {
			var n = t[e.id];
			if (o(n)) {
				var r = n.primitive;
				i.remove(r), r.isDestroyed() || r.destroy(), delete t[e.id]
			}
		};
		var n, r = i(0);
		var o = ((n = r) && n.__esModule ? n : {
		default:
			n
		}).
	default.defined
	}, function(e, t, i) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.ConicArcSensorCollection = void 0;
		var n, r = i(0),
			I = (n = r) && n.__esModule ? n : {
			default:
				n
			},
			z = i(3),
			k = i(4),
			o = i(16);
		I.
	default.defaultValue;
		var V = I.
	default.defined,
			R = (I.
		default.Viewer, I.
		default.Transforms),
			a = I.
		default.DeveloperError,
			F = (I.
		default.ColorGeometryInstanceAttribute, I.
		default.Color),
			W = I.
		default.Primitive,
			B = I.
		default.PerInstanceColorAppearance,
			G = I.
		default.Cartesian3,
			H = (I.
		default.VertexFormat, I.
		default.Quaternion),
			N = I.
		default.Matrix3,
			Y = I.
		default.Matrix4,
			q = I.
		default.Property;
		I.
	default.Event, I.
	default.DistanceDisplayCondition, I.
	default.DistanceDisplayConditionGeometryInstanceAttribute;

		function s(e) {
			var t = this;
			if (!V(e)) throw new a("viewer is required.");
			var i = (this._viewer = e).scene;
			this._scene = i;
			var n = e.clock;
			this._clock = n, this._primitives = i.primitives, this._primitive = void 0, this._outlinePrimitive = void 0, this._conicArcSensorCollection = [], n.onTick.addEventListener(function() {
				t.update()
			})
		}
		var j = new N,
			U = new Y,
			X = new G,
			Z = new G,
			J = new G,
			Q = new H;
		s.prototype.add = function(e) {
			return e instanceof o.ConicArcSensor || (e = new o.ConicArcSensor(e)), this._conicArcSensorCollection.push(e), e
		}, s.prototype.remove = function(e) {
			var t = this._conicArcSensorCollection.indexOf(e); - 1 !== t && this._conicArcSensorCollection.splice(t, 1)
		}, s.prototype.removeAll = function() {
			this._conicArcSensorCollection.length = 0
		}, s.prototype.update = function() {
			var e = this._clock.currentTime,
				t = this._conicArcSensorCollection,
				i = this._primitives,
				n = this._primitive,
				r = this._outlinePrimitive,
				o = [],
				a = [];
			V(n) && i.removeAndDestroy(n), V(r) && i.removeAndDestroy(r);
			for (var s = 0, l = t.length; s < l; s++) {
				var u = t[s],
					c = u._conicArcSensor;
				if (q.getValueOrDefault(c.show, e, !0)) {
					var d = c.angle,
						f = c.radius,
						h = c.stack,
						p = c.slice;
					if (V(d)) if (q.getValueOrDefault(u.show, e, !0)) {
						var m = q.getValueOrUndefined(u.position, e, X);
						if (V(m)) {
							var _, v = c.gaze;
							if (V(v)) {
								var y = q.getValueOrUndefined(v.position, e, Z);
								if (!V(m) || !V(y)) continue;
								var g = G.subtract(m, y, J),
									w = G.angleBetween(I.
								default.Cartesian3.UNIT_Z, g),
									C = G.cross(I.
								default.Cartesian3.UNIT_Z, g, J),
									P = H.fromAxisAngle(C, w, Q),
									S = G.distance(m, y);
								f = 1, _ = Y.fromRotationTranslation(I.
							default.Matrix3.multiplyByScalar(N.fromQuaternion(P, j), S, j), m, U)
							} else {
								P = q.getValueOrUndefined(u.orientation, e, Q);
								_ = V(P) ? Y.fromRotationTranslation(N.fromQuaternion(P, j), m, U) : R.eastNorthUpToFixedFrame(m, void 0, U)
							}
							if (V(_)) {
								var M, A = u._geometry;
								if (!V(A)) M = new z.ConicArcSensorGeometry({
									vertexFormat: I.
								default.VertexFormat.POSITION_AND_NORMAL,
									angle:
									d,
									radius: f,
									stackPartitions: h,
									slicePartitions: p
								}), u._geometry = z.ConicArcSensorGeometry.createGeometry(M), A = u._geometry;
								var E = c.color,
									T = c.outline,
									x = c.outlineWidth;
								V(x) || (x = 1);
								var b = c.outlineColor;
								V(b) || (b = F.WHITE);
								var L = new I.
							default.GeometryInstance({
									geometry: A,
									modelMatrix: _,
									attributes: {
										color: I.
									default.ColorGeometryInstanceAttribute.fromColor(E)
									}
								});
								if (o.push(L), T) {
									var D, O = u._outlineGeometry;
									if (!V(O)) D = new k.ConicArcSensorOutlineGeometry({
										vertexFormat: I.
									default.VertexFormat.POSITION_ONLY,
										angle:
										d,
										radius: f
									}), u._outlineGeometry = k.ConicArcSensorOutlineGeometry.createGeometry(D), O = u._outlineGeometry;
									L = new I.
								default.GeometryInstance({
										geometry: O,
										modelMatrix: _,
										attributes: {
											color: I.
										default.ColorGeometryInstanceAttribute.fromColor(b)
										}
									});
									a.push(L)
								}
							}
						}
					}
				}
			}
			0 < o.length && (this._primitive = this._primitives.add(new W({
				asynchronous: !1,
				geometryInstances: o,
				appearance: new B({
					flat: !1,
					translucent: !0,
					closed: !0
				})
			}))), 0 < a.length && (this._outlinePrimitive = this._primitives.add(new W({
				asynchronous: !1,
				geometryInstances: a,
				appearance: new B({
					flat: !0,
					translucent: !0,
					renderState: {
						lineWidth: this._scene.clampLineWidth(x)
					}
				})
			})))
		}, t.ConicArcSensorCollection = s
	}, function(e, t, i) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.ConicArcSensor = void 0;
		var n, r = i(0),
			o = (n = r) && n.__esModule ? n : {
			default:
				n
			},
			a = i(5);
		var s, l = o.
	default.Entity,
			u = o.
		default.Event,
			c = o.
		default.ConstantPositionProperty,
			d = o.
		default.createPropertyDescriptor,
			f = o.
		default.DistanceDisplayCondition;
		o.
	default.DistanceDisplayConditionGeometryInstanceAttribute;

		function h(e) {
			return new c(e)
		}
		function p(e) {
			e = e || {}, this._position = void 0, this._orientation = void 0, this._show = void 0;
			var t = e.conicArcSensor;
			t instanceof a.ConicArcSensorGraphics || (t = new a.ConicArcSensorGraphics(t)), this._conicArcSensor = t, this._distanceDisplayCondition = new f, this._geometry = void 0, this._outlineGeometry = void 0, this._definitionChanged = new u, this.merge(e)
		}
		Object.defineProperties(p.prototype, {
			position: (s = "position", d(s, void 0, h)),
			orientation: d("orientation"),
			show: d("show")
		}), p.prototype.merge = function(e) {
			this.position = e.position, this.orientation = e.orientation, this.show = e.show
		}, p.prototype.gazeAt = function(e) {
			e instanceof l && (this._conicArcSensor.gaze = e)
		}, t.ConicArcSensor = p
	}, function(e, t, i) {
		"use strict";
		var n = m(i(0)),
			r = i(18),
			o = i(19),
			a = i(20),
			s = i(21),
			l = i(22),
			u = i(23),
			c = m(i(24)),
			d = (m(i(25)), m(i(26))),
			f = m(i(27)),
			h = m(i(28)),
			p = i(1);

		function m(e) {
			return e && e.__esModule ? e : {
			default:
				e
			}
		}
		var _ = n.
	default.Color,
			v = (n.
		default.ShaderSource, n.
		default.Material),
			y = p.util.getBaseUrl();
		v.PolylineAttackLinkType = "PolylineAttackLink", v.PolylineAttackLinkImage = y + "../../../static/image/scene/DotTransparent.png", v._materialCache.addMaterial(v.PolylineAttackLinkType, {
			fabric: {
				type: v.PolylineAttackLinkType,
				uniforms: {
					color: new _(1, 0, 0, 1),
					image: v.PolylineAttackLinkImage,
					time: 0
				},
				source: c.
			default
			},
			translucent: function() {
				return !0
			}
		}), v.PolylineArrowLinkType = "PolylineArrowLink", v.PolylineArrowLinkImage = y +"../../../static/image/scene/LinkPulse1.png", v._materialCache.addMaterial(v.PolylineArrowLinkType, {
			fabric: {
				type: v.PolylineArrowLinkType,
				uniforms: {
					color: new _(1, 0, 0, 1),
					image: v.PolylineArrowLinkImage,
					time: 0
				},
				source: c.
			default
			},
			translucent: function() {
				return !0
			}
            //y + "../../../static/image/scene/LinkPulse.png"
		}), v.PolylinePulseLinkType = "PolylinePulseLink", v.PolylinePulseLinkImage =ConstantData.imageUrl.pulseLink, v._materialCache.addMaterial(v.PolylinePulseLinkType, {
			fabric: {
				type: v.PolylinePulseLinkType,
				uniforms: {
					color: new _(1, 0, 0, 1),
					image: v.PolylinePulseLinkImage,
					time: 0
				},
				source: c.
			default
			},
			translucent: function() {
				return !0
			}
		}), v.PolylineGrowLinkType = "PolylineGrowLinkType", v._materialCache.addMaterial(v.PolylineGrowLinkType, {
			fabric: {
				type: v.PolylineGrowLinkType,
				uniforms: {
					glowPower: .1,
					color: new _(1, 0, 0, 1)
				},
				source: d.
			default
			},
			translucent: function() {
				return !0
			}
		}), v.PolylineTrailLinkType = "PolylineTrailLinkType", v.PolylineTrailLinkImage = y + "../../../static/image/scene/LinkTrail.png", v._materialCache.addMaterial(v.PolylineTrailLinkType, {
			fabric: {
				type: v.PolylineTrailLinkType,
				uniforms: {
					image: v.PolylineTrailLinkImage,
					color: new _(1, 0, 0, 1)
				},
				source: f.
			default
			},
			translucent: function() {
				return !0
			}
		}), v.EllipsoidFadeType = "EllipsoidFade", v._materialCache.addMaterial(v.EllipsoidFadeType, {
			fabric: {
				type: v.EllipsoidFadeType,
				uniforms: {
					color: new _(1, 0, 0, 1),
					time: 1
				},
				source: h.
			default
			},
			translucent: function() {
				return !0
			}
		}), n.
	default.PolylineAttackLinkMaterialProperty = r.PolylineAttackLinkMaterialProperty, n.
	default.PolylineArrowLinkMaterialProperty = o.PolylineArrowLinkMaterialProperty, n.
	default.PolylineGlowLinkMaterialProperty = a.PolylineGlowLinkMaterialProperty, n.
	default.PolylinePulseLinkMaterialProperty = s.PolylinePulseLinkMaterialProperty, n.
	default.PolylineTrailLinkMaterialProperty = l.PolylineTrailLinkMaterialProperty, n.
	default.ElliposidFadeMaterialProperty = u.ElliposidFadeMaterialProperty
	}, function(e, t, i) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.PolylineAttackLinkMaterialProperty = void 0;
		var n, r = i(0),
			o = (n = r) && n.__esModule ? n : {
			default:
				n
			};
		i(1);
		var a = o.
	default.Color,
			s = o.
		default.defaultValue,
			l = o.
		default.defined,
			u = o.
		default.defineProperties,
			c = o.
		default.Event,
			d = o.
		default.createPropertyDescriptor,
			f = o.
		default.Property,
			h = o.
		default.Material,
			p = a.WHITE;

		function m(e) {
			e = s(e, s.EMPTY_OBJECT), this._definitionChanged = new c, this._color = void 0, this._colorSubscription = void 0, this.color = e.color, this.duration = e.duration || 1e3, this._time = void 0
		}
		u(m.prototype, {
			isConstant: {
				get: function() {
					return !1
				}
			},
			definitionChanged: {
				get: function() {
					return this._definitionChanged
				}
			},
			color: d("color")
		}), m.prototype.getType = function(e) {
			return h.PolylineAttackLinkType
		}, m.prototype.getValue = function(e, t) {
			return l(t) || (t = {}), t.color = f.getValueOrClonedDefault(this._color, e, p, t.color), t.image = h.PolylineAttackLinkImage, void 0 === this._time && (this._time = e.secondsOfDay), t.time = (e.secondsOfDay - this._time) / this.duration, t
		}, m.prototype.equals = function(e) {
			return this === e || e instanceof m && f.equals(this._color, e._color)
		}, t.PolylineAttackLinkMaterialProperty = m
	}, function(e, t, i) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.PolylineArrowLinkMaterialProperty = void 0;
		var n, r = i(0),
			o = (n = r) && n.__esModule ? n : {
			default:
				n
			};
		i(1);
		var a = o.
	default.Color,
			s = o.
		default.defaultValue,
			l = o.
		default.defined,
			u = o.
		default.defineProperties,
			c = o.
		default.Event,
			d = o.
		default.createPropertyDescriptor,
			f = o.
		default.Property,
			h = o.
		default.Material,
			p = a.WHITE;

		function m(e) {
			e = s(e, s.EMPTY_OBJECT), this._definitionChanged = new c, this._color = void 0, this._colorSubscription = void 0, this.color = e.color, this.duration = e.duration || 1e3, this._time = void 0
		}
		u(m.prototype, {
			isConstant: {
				get: function() {
					return !1
				}
			},
			definitionChanged: {
				get: function() {
					return this._definitionChanged
				}
			},
			color: d("color")
		}), m.prototype.getType = function(e) {
			return h.PolylineArrowLinkType
		}, m.prototype.getValue = function(e, t) {
			return l(t) || (t = {}), t.color = f.getValueOrClonedDefault(this._color, e, p, t.color), t.image = h.PolylineArrowLinkImage, void 0 === this._time && (this._time = e.secondsOfDay), t.time = 1e3 * (e.secondsOfDay - this._time) / this.duration, t
		}, m.prototype.equals = function(e) {
			return this === e || e instanceof m && f.equals(this._color, e._color)
		}, t.PolylineArrowLinkMaterialProperty = m
	}, function(e, t, i) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.PolylineGlowLinkMaterialProperty = void 0;
		var n, r = i(0),
			o = (n = r) && n.__esModule ? n : {
			default:
				n
			};
		var a = o.
	default.Color,
			s = o.
		default.defaultValue,
			l = o.
		default.defined,
			u = o.
		default.defineProperties,
			c = o.
		default.Event,
			d = o.
		default.createPropertyDescriptor,
			f = o.
		default.Property,
			h = o.
		default.Material,
			p = a.WHITE;

		function m(e) {
			e = s(e, s.EMPTY_OBJECT), this._definitionChanged = new c, this._color = void 0, this._colorSubscription = void 0, this.color = e.color
		}
		u(m.prototype, {
			isConstant: {
				get: function() {
					return !1
				}
			},
			definitionChanged: {
				get: function() {
					return this._definitionChanged
				}
			},
			color: d("color")
		}), m.prototype.getType = function(e) {
			return h.PolylineGrowLinkType
		}, m.prototype.getValue = function(e, t) {
			return l(t) || (t = {}), t.color = f.getValueOrClonedDefault(this._color, e, p, t.color), t
		}, m.prototype.equals = function(e) {
			return this === e || e instanceof m && f.equals(this._color, e._color)
		}, t.PolylineGlowLinkMaterialProperty = m
	}, function(e, t, i) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.PolylinePulseLinkMaterialProperty = void 0;
		var n, r = i(0),
			o = (n = r) && n.__esModule ? n : {
			default:
				n
			};
		i(1);
		var a = o.
	default.Color,
			s = o.
		default.defaultValue,
			l = o.
		default.defined,
			u = o.
		default.defineProperties,
			c = o.
		default.Event,
			d = o.
		default.createPropertyDescriptor,
			f = o.
		default.Property,
			h = o.
		default.Material,
			p = a.WHITE;

		function m(e) {
			e = s(e, s.EMPTY_OBJECT), this._definitionChanged = new c, this._color = void 0, this._colorSubscription = void 0, this.color = e.color, this.duration = e.duration || 1e3, this._time = void 0
		}
		u(m.prototype, {
			isConstant: {
				get: function() {
					return !1
				}
			},
			definitionChanged: {
				get: function() {
					return this._definitionChanged
				}
			},
			color: d("color")
		}), m.prototype.getType = function(e) {
			return h.PolylinePulseLinkType
		}, m.prototype.getValue = function(e, t) {
			return l(t) || (t = {}), t.color = f.getValueOrClonedDefault(this._color, e, p, t.color), t.image = h.PolylinePulseLinkImage, void 0 === this._time && (this._time = e.secondsOfDay), t.time = 1e3 * (e.secondsOfDay - this._time) / this.duration, t
		}, m.prototype.equals = function(e) {
			return this === e || e instanceof m && f.equals(this._color, e._color)
		}, t.PolylinePulseLinkMaterialProperty = m
	}, function(e, t, i) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.PolylineTrailLinkMaterialProperty = void 0;
		var n, r = i(0),
			o = (n = r) && n.__esModule ? n : {
			default:
				n
			};
		i(1);
		var a = o.
	default.Color,
			s = o.
		default.defaultValue,
			l = o.
		default.defined,
			u = o.
		default.defineProperties,
			c = o.
		default.Event,
			d = o.
		default.createPropertyDescriptor,
			f = o.
		default.Property,
			h = o.
		default.Material,
			p = a.WHITE;

		function m(e) {
			e = s(e, s.EMPTY_OBJECT), this._definitionChanged = new c, this._color = void 0, this._colorSubscription = void 0, this.color = e.color, this._time = void 0
		}
		u(m.prototype, {
			isConstant: {
				get: function() {
					return !1
				}
			},
			definitionChanged: {
				get: function() {
					return this._definitionChanged
				}
			},
			color: d("color")
		}), m.prototype.getType = function(e) {
			return h.PolylineTrailLinkType
		}, m.prototype.getValue = function(e, t) {
			return l(t) || (t = {}), t.color = f.getValueOrClonedDefault(this._color, e, p, t.color), t.image = h.PolylineTrailLinkImage, t
		}, m.prototype.equals = function(e) {
			return this === e || e instanceof m && f.equals(this._color, e._color)
		}, t.PolylineTrailLinkMaterialProperty = m
	}, function(e, t, i) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.ElliposidFadeMaterialProperty = void 0;
		var n, r = i(0),
			o = (n = r) && n.__esModule ? n : {
			default:
				n
			};
		i(1);
		var a = o.
	default.Color,
			s = o.
		default.defaultValue,
			l = o.
		default.defined,
			u = o.
		default.defineProperties,
			c = o.
		default.Event,
			d = o.
		default.createPropertyDescriptor,
			f = o.
		default.Property,
			h = o.
		default.Material,
			p = a.WHITE;

		function m(e) {
			e = s(e, s.EMPTY_OBJECT), this._definitionChanged = new c, this._color = void 0, this._colorSubscription = void 0, this.color = e.color, this._time = void 0
		}
		u(m.prototype, {
			isConstant: {
				get: function() {
					return !1
				}
			},
			definitionChanged: {
				get: function() {
					return this._definitionChanged
				}
			},
			color: d("color")
		}), m.prototype.getType = function(e) {
			return h.EllipsoidFadeType
		}, m.prototype.getValue = function(e, t) {
			return l(t) || (t = {}), t.color = f.getValueOrClonedDefault(this._color, e, p, t.color), void 0 === this._time && (this._time = e.secondsOfDay), t.time = e.secondsOfDay - this._time, t
		}, m.prototype.equals = function(e) {
			return this === e || e instanceof m && f.equals(this._color, e._color)
		}, t.ElliposidFadeMaterialProperty = m
	}, function(e, t) {
		e.exports = "czm_material czm_getMaterial(czm_materialInput materialInput)\r\n{\r\n    czm_material material = czm_getDefaultMaterial(materialInput);\r\n    vec2 st = materialInput.st;\r\n\r\n    if(texture2D(image, vec2(0.0, 0.0)).a == 1.0){\r\n        discard;\r\n    }else{\r\n         material.alpha = texture2D(image, vec2(1.0 - fract(time - st.s), st.t)).a * color.a;\r\n    }\r\n\r\n    material.diffuse = max(color.rgb * material.alpha * 3.0, color.rgb);\r\n\r\n    return material;\r\n}"
	}, function(e, t) {
		e.exports = "czm_material czm_getMaterial(czm_materialInput materialInput)\r\n{\r\n    czm_material material = czm_getDefaultMaterial(materialInput);\r\n    vec2 st = materialInput.st;\r\n\r\n    if(texture2D(image, vec2(0.0, 0.0)).a == 1.0){\r\n        discard;\r\n    }else{\r\n         material.alpha = texture2D(image, vec2(1.0 - fract(time - st.s), st.t)).a * color.a;\r\n    }\r\n\r\n    material.diffuse = max(color.rgb * material.alpha * 10.0, color.rgb);\r\n\r\n    return material;\r\n}"
	}, function(e, t) {
		e.exports = "uniform vec4 color;\r\nuniform float glowPower;\r\n\r\nvarying float v_width;\r\n\r\nczm_material czm_getMaterial(czm_materialInput materialInput)\r\n{\r\n    czm_material material = czm_getDefaultMaterial(materialInput);\r\n\r\n    vec2 st = materialInput.st;\r\n    float glow = glowPower / abs(st.t - 0.5) - (glowPower / 0.5);\r\n\r\n    material.emission = max(vec3(glow - 1.0 + color.rgb), color.rgb);\r\n    material.alpha = clamp(0.0, 1.0, glow) * color.a * st.s;\r\n\r\n    //material.emission =  color.rgb;\r\n    //material.alpha =  color.a;\r\n\r\n    return material;\r\n}\r\n"
	}, function(e, t) {
		e.exports = "czm_material czm_getMaterial(czm_materialInput materialInput)\r\n{\r\n    czm_material material = czm_getDefaultMaterial(materialInput);\r\n    vec2 st = materialInput.st;\r\n\r\n    if(texture2D(image, vec2(0.0, 0.0)).a == 1.0){\r\n        discard;\r\n    }else{\r\n         material.alpha = texture2D(image, st).a * color.a;\r\n    }\r\n\r\n   /* if(texture2D(image, st).a > 0.9){\r\n       material.diffuse = vec3(1.0);\r\n    }else{\r\n     material.diffuse = color.rgb;\r\n    }*/\r\n\r\n    material.diffuse = max( material.diffuse* material.alpha * 3.0,  material.diffuse);\r\n\r\n    return material;\r\n}"
	}, function(e, t) {
		e.exports = "czm_material czm_getMaterial(czm_materialInput materialInput)\r\n{\r\n    czm_material material = czm_getDefaultMaterial(materialInput);\r\n    material.diffuse = 1.5 * color.rgb;\r\n\r\n    vec2 st = materialInput.st;\r\n    float dis = distance(st, vec2(0.5, 0.5));\r\n\r\n    float per = fract(time);\r\n    if(dis > per * 0.5){\r\n       //material.alpha = 0.0;\r\n       discard;\r\n    }else {\r\n         material.alpha = color.a  * dis / per / 2.0;\r\n    }\r\n    return material;\r\n}"
	}, function(e, t, i) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.getLinkedPointList = function(e, t, i, n) {
			var r = [],
				o = T.
			default.Cartographic.fromCartesian(e),
				a = T.
			default.Cartographic.fromCartesian(t),
				s = 180 * o.longitude / Math.PI,
				l = 180 * o.latitude / Math.PI,
				u = 180 * a.longitude / Math.PI,
				c = 180 * a.latitude / Math.PI,
				d = Math.sqrt((s - u) * (s - u) + (l - c) * (l - c)) * i,
				f = T.
			default.Cartesian3.clone(e),
				h = T.
			default.Cartesian3.clone(t),
				p = T.
			default.Cartesian3.distance(f, T.
			default.Cartesian3.ZERO),
				m = T.
			default.Cartesian3.distance(h, T.
			default.Cartesian3.ZERO);
			if (T.
		default.Cartesian3.normalize(f, f), T.
		default.Cartesian3.normalize(h, h), 0 == T.
		default.Cartesian3.distance(f, h)) return r;
			var _ = T.
		default.Cartesian3.angleBetween(f, h);
			r.push(e);
			for (var v = 1; v < n - 1; v++) {
				var y = 1 * v / (n - 1),
					g = 1 - y,
					w = Math.sin(g * _) / Math.sin(_),
					C = Math.sin(y * _) / Math.sin(_),
					P = T.
				default.Cartesian3.multiplyByScalar(f, w, new T.
				default.Cartesian3),
					S = T.
				default.Cartesian3.multiplyByScalar(h, C, new T.
				default.Cartesian3),
					M = T.
				default.Cartesian3.add(P, S, new T.
				default.Cartesian3),
					A = y * Math.PI,
					E = p * g + m * y + Math.sin(A) * d;
				M = T.
			default.Cartesian3.multiplyByScalar(M, E, M), r.push(M)
			}
			return r.push(t), r
		};
		var n, r = i(0),
			T = (n = r) && n.__esModule ? n : {
			default:
				n
			}
	}])
});