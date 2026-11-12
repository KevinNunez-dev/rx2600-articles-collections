import bpy
import sys

output = sys.argv[sys.argv.index("--") + 1]
bones = ["Vertebra L1", "Vertebra L2", "Vertebra L3", "Vertebra L4", "Vertebra L5", "Sacrum", "Hip bone.l", "Hip bone.r"]
muscles = [
    f"{name}.{side}"
    for name in ["Psoas major", "Iliacus muscle", "Piriformis muscle", "Gluteus medius muscle", "Quadratus lumborum muscle"]
    for side in ["l", "r"]
]
missing = [name for name in bones + muscles if name not in bpy.data.objects]
if missing:
    raise RuntimeError(f"Missing anatomy objects: {', '.join(missing)}")

scene = bpy.data.scenes.new("RX2600 anatomy")
bpy.context.window.scene = scene

for name in bones + muscles:
    source = bpy.data.objects[name]
    obj = source.copy()
    obj.data = source.data.copy()
    obj.parent = None
    obj.matrix_world = source.matrix_world.copy()
    scene.collection.objects.link(obj)
    obj.hide_viewport = False
    obj.hide_render = False
    obj.hide_set(False)

bpy.ops.export_scene.gltf(
    filepath=output,
    export_format="GLB",
    use_active_scene=True,
    export_apply=True,
)
